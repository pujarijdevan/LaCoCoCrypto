# La Coco Crypto Exchange - QA

## Tech Stacks

1. Cypress
2. Typescript
3. Pnpm
4. Mocha Awesome report.
5. Github workflow

## About Framework:
1. Framework support data driven test
2. Support mocha awesome report to view test report after test execution.
3. Capture failure screenshot and video of the test execution
4. Github Actions CI/CD support on demand trigger.


## Test Cases Covered

1. TC -01 Verify website display store name and current date/time, 2 input boxes , currency exchange value section
2. TC -02 Verify exchange supports BTC, ETH, USDT, DFI, DOGE cryptocurrency
3. TC-03 Verify exchange supports input field Token to swap and token to receive
4. TC-04 On change of input #1 or input #2, both fields should recalculate
5. TC-05 Both inputs should be able to switch to other currency
6. TC -06 Verify user should not be able to select on same currency on both fields
7. TC-07 Verify Prices should be displayed (e.g, 1 BTC = 16.47 ETH)
8. TC -08 Verify user should have a swap button and on clicking it, it will reverse the currencies.
9. TC -09 Verify both input fields accepts numbers
10. TC -10 Verify Input Box does not accept string as input
11. TC-11 Verify tokens available to receive with default value
12. TC -12 Verify tokens available to swap with default value

## How to execute locally
1. git clone https://github.com/pujarijdevan/LaCoCoCrypto.git
- Make sure to install node and pnpm Refer https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac
- https://pnpm.io/installation

2. cd LaCoCoCrypto/
3. pnpm install
4. npx run cypress

## How to execute in CI/CD : 
1. Go to https://github.com/pujarijdevan/LaCoCoCrypto/actions/workflows/main.yml
2. Click on run workflow
3. Wait for run to finish and click on artifacts to download the file to view the results in index.js
- Sample:  https://github.com/pujarijdevan/LaCoCoCrypto/actions/runs/5559596062
