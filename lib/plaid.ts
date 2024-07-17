import { configuration, PlaidApi, plaidApi, plaidEnvironments}
from 'plaid';

const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID-CLIENT-ID,
            'PLAID-SECRET': process.env.PLAID_SECRET,
        }
    
    }
})

export const plaidClient = new PlaidApi(configuration);