/// <reference types="cypress" />

describe('E2E Suite - LA COCO Crypto exchange', () => {
  let data;
  before(function() {
    cy.log("In before block")
    cy.fixture('text').then(function(value){
      data=value
   })
 })
  beforeEach(() => {
    cy.log("In befoore each block")
    cy.visit('/');
  })
    it('TC -01 Verify website display store name and current date/time, 2 inpput boxes , currency exchange value section ', () => {
        cy.title().should('eq',data.Title);
        cy.get('.text-gray-400').should('have.text', data.Description);
        cy.get('div[class=\' bg-gray-100 rounded-2xl\']').should('exist')
        cy.get('label[data-testid=\'swap-label\']').should('have.text',data.Description.DefaultInputBoxValue)
        cy.get('input[data-testid="swap-input"]').should('have.attr', 'type', 'number');
        cy.get('input[data-testid="buy-input"]').should('have.attr', 'type', 'number');
        cy.get('[data-testid="buy-label"]').should('have.text',data.Description.DefaultBuyInoutBoxValue)
        cy.get('.text-cyan-600.text-sm').should('have.text','Current exchange rate')
        cy.get('img[alt=\'bitcoin logo\']').should('exist')
        cy.get('[data-testid="exchange-rate"]').should('have.text','N/A')
        cy.get('.text-cyan-600.text-opacity-60.text-xs.mt-14').should('contain',data.Description.SubscriptContent);
        const currentDate = new Date();
        const options: Intl.DateTimeFormatOptions = { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' ,
          hour12: false
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const formattedDateTime = formatter.format(currentDate).replace(' at', '');
        cy.get('.text-cyan-600.text-opacity-60.text-xs.mt-14').should('contain',formattedDateTime)
          
      });

      it('TC -02 Verify exchange supports BTC, ETH, USDT, DFI, DOGE crypto currency', () => {
        cy.get('[data-testid="swap-dropdown"]').click();
        cy.get('[data-testid="swap-dropdown"]').should('have.attr', 'type', 'button');
        cy.get('[data-testid="swap-dropdown"]').should('have.attr', 'aria-haspopup', 'listbox');
        cy.get('label[data-testid=\'swap-label\']').should('have.text','btc to swap')
        const currency = []
        cy.get('[data-testid="swap-dropdown-options"] li').each(($li) => currency.push($li.text()))
        cy.wrap(currency).should('deep.equal', [
            'Bitcoin',
            'Ethereum',
            'Tether',
            'Cardano',
            'Dogecoin',
            'Solana'
            ])

      })

    it('TC-03 Verify exchange supports input field Token to swap and token to receive', () => {
        cy.get('input[data-testid="swap-input"]').should('have.attr', 'type', 'number');
        cy.get('input[data-testid="buy-input"]').should('have.attr', 'type', 'number');
        cy.get('input[data-testid="swap-input"]').type('1');
        cy.get('input[data-testid="swap-input"]').should('have.value', '1');
    })

    it('TC-04 On change of input #1 or input #2, both fields should recalculate', () => {
        cy.get('[data-testid="swap-dropdown"]').click();
        cy.contains('[data-testid="swap-dropdown-options"] li', 'Bitcoin').click();
        cy.get('[data-testid="buy-dropdown"]').click();
        cy.contains('[data-testid="buy-dropdown-options"] li', 'Ethereum').click();
        cy.get('input[data-testid="swap-input"]').type('1');
        cy.get('input[data-testid="buy-input"]').should('have.value', '16.27')
        cy.get('input[data-testid="buy-input"]').clear();
        cy.get('input[data-testid="buy-input"]').type('16');
        cy.get('input[data-testid="swap-input"]').should('have.value', '0.98')

    })
    it('TC-05 Both inputs should be able to switch to other currency', () => {
        cy.get('[data-testid="swap-dropdown"]').click();
        cy.contains('[data-testid="swap-dropdown-options"] li', 'Bitcoin').click();
        cy.get('[data-testid="swap-dropdown"]').click();
        cy.contains('[data-testid="swap-dropdown-options"] li', 'Tether').click();
        cy.get('[data-testid="buy-dropdown"]').click();
        cy.contains('[data-testid="buy-dropdown-options"] li', 'Ethereum').click();
        cy.get('[data-testid="buy-dropdown"]').click();
        cy.contains('[data-testid="buy-dropdown-options"] li', 'Cardano').click();

    })

    it('TC -06 Verify user should not be able to select on same currency on both fields', () => {
        cy.get('[data-testid="swap-dropdown"]').click();
        const currency: string[] = [];
        cy.get('[data-testid="swap-dropdown-options"] li').each(($li) => {
          const currencyName = $li.text();
          currency.push(currencyName);
        }).then(() => {
          cy.wrap(currency).each((currencyName) => {
            cy.log(currencyName);
            cy.get('[data-testid="swap-dropdown"]').click();
            cy.contains('[data-testid="swap-dropdown-options-list-name"]', currencyName).click();
            cy.get('[data-testid="buy-dropdown"]').click();
            cy.contains('[data-testid="buy-dropdown-options-list-name"]', currencyName).should('not.exist');
          });
        });
      });          

    it('TC-07 Verify Prices should be displayed (e.g, 1 BTC = 16.47 ETH)', () => {
        cy.get('[data-testid="swap-dropdown"]').click();
        cy.contains('[data-testid="swap-dropdown-options"] li', 'Bitcoin').click();
        cy.get('[data-testid="buy-dropdown"]').click();
        cy.contains('[data-testid="buy-dropdown-options"] li', 'Ethereum').click();
        cy.get('input[data-testid="swap-input"]').type('1');
        cy.get('input[data-testid="buy-input"]').should('have.value', '16.27')
        cy.get('div.text-cyan-600.text-sm').should('be.visible').and('have.text', 'Current exchange rate');
        cy.get('[data-testid="exchange-rate"]').should('be.visible').and('have.text', '16.27');
    })

    it('TC -08 Verify user should have a swap button and on clicking it, it will reverse the currencies.', () => {
        cy.get('[data-testid="swap-dropdown"]').click();
        cy.contains('[data-testid="swap-dropdown-options"] li', 'Ethereum').click();
        cy.get('[data-testid="buy-dropdown"]').click();
        cy.contains('[data-testid="buy-dropdown-options"] li', 'Bitcoin').click();
        cy.get('label[data-testid=\'swap-label\']').should('have.text','eth to swap')
        cy.get('[data-testid="buy-label"]').should('have.text','btc to buy')
        cy.get('[data-testid="switch-token"]').click();
        cy.get('label[data-testid=\'swap-label\']').should('have.text','btc to swap')
        cy.get('[data-testid="buy-label"]').should('have.text','eth to buy')

    })

    it('TC -09 Verify both input fields accepts numbers', () => {
        cy.get('input[data-testid="swap-input"]').should('have.attr', 'type', 'number');
        cy.get('input[data-testid="buy-input"]').should('have.attr', 'type', 'number');
        cy.get('input[data-testid="swap-input"]').type('1');
        cy.get('input[data-testid="swap-input"]').should('have.value', '1');
        cy.get('input[data-testid="buy-input"]').clear();
        cy.get('input[data-testid="buy-input"]').type('10');
        cy.get('input[data-testid="buy-input"]').should('have.value', '10');
        cy.get('input[data-testid="swap-input"]').clear();
        cy.get('input[data-testid="swap-input"]').type('ab12');
        cy.get('input[data-testid="swap-input"]').should('have.value', '12');
    })

    it('TC -10 Verify Input Box does not accept string as input', () => {
        cy.get('input[data-testid="swap-input"]').type('abc');
        cy.get('input[data-testid="swap-input"]').should('have.value', '');
    })

    it('TC-11 Verify tokens available to receive with default value', () => {
        cy.get('[data-testid="buy-dropdown"]').click();
        cy.get('[data-testid="buy-dropdown"]').should('have.attr', 'type', 'button');
        cy.get('[data-testid="buy-dropdown"]').should('have.attr', 'aria-haspopup', 'listbox');
        cy.get('[data-testid="buy-label"]').should('have.text','dfi to buy')
        const currency = []
        cy.get('[data-testid="buy-dropdown-options"] li').each(($li) => currency.push($li.text()))
        cy.wrap(currency).should('deep.equal', [
            'Ethereum',
            'Tether',
            'Cardano',
            'Dogecoin',
            'Solana',
            'DeFiChain'
            ])

    })
    
    it('TC -12 Verify tokens available to swap with default value', () => {
        cy.get('[data-testid="swap-dropdown"]').click();
        cy.get('[data-testid="swap-dropdown"]').should('have.attr', 'type', 'button');
        cy.get('[data-testid="swap-dropdown"]').should('have.attr', 'aria-haspopup', 'listbox');
        cy.get('label[data-testid=\'swap-label\']').should('have.text','btc to swap')
        const currency = []
        cy.get('[data-testid="swap-dropdown-options"] li').each(($li) => currency.push($li.text()))
        cy.wrap(currency).should('deep.equal', [
            'Bitcoin',
            'Ethereum',
            'Tether',
            'Cardano',
            'Dogecoin',
            'Solana'
            ])

    })
})