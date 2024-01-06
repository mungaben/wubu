

export type Link = {
    href: string;
    templated?: boolean;
};

export type Links = {
    self: Link;
    transactions: Link;
    operations: Link;
    payments: Link;
    effects: Link;
    offers: Link;
    trades: Link;
    data: Link;
};

export type Thresholds = {
    low_threshold: number;
    med_threshold: number;
    high_threshold: number;
};

export type Flags = {
    auth_required: boolean;
    auth_revocable: boolean;
    auth_immutable: boolean;
    auth_clawback_enabled: boolean;
};

export type Balance = {
    balance: string;
    limit?: string;
    buying_liabilities: string;
    selling_liabilities: string;
    last_modified_ledger: number;
    is_authorized?: boolean;
    is_authorized_to_maintain_liabilities?: boolean;
    asset_type: string;
    asset_code?: string;
    asset_issuer?: string;
};

export type Signer = {
    weight: number;
    key: string;
    type: string;
};

export type AccountData = {
    _links: Links;
    id: string;
    account_id: string;
    sequence: string;
    sequence_ledger: number;
    sequence_time: string;
    subentry_count: number;
    last_modified_ledger: number;
    last_modified_time: string;
    thresholds: Thresholds;
    flags: Flags;
    balances: Balance[];
    signers: Signer[];
    data: Record<string, unknown>;
    num_sponsoring: number;
    num_sponsored: number;
    paging_token: string;
};

export type ApiResponseGetAccountInfo = {
    status: string;
    code: number;
    data: AccountData;
    message: string;
};



export type TMergePostTransactionResponse = {
    status: string;
    code: number;
    data: {
        Successful: boolean;
        Transaction_hash: string;
        Created_at: string;
    };
    message: string;
};

export type  TDepositInteractiveResponse ={
    status: string;
    code: number;
    data: {
        type: string;
        url: string;
        id: string;
    };
    message: string;
}