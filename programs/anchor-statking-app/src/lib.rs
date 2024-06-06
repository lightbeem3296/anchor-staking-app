use anchor_lang::prelude::*;

declare_id!("HdEjaNvBTx7WsfrXP1dReQ7Jm536DycbSAPwiqDTaeem");

#[program]
pub mod anchor_statking_app {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.pool.authority = ctx.accounts.authority.key();
        ctx.accounts.pool.user_count = 0u32;
        Ok(())
    }
}

pub const POOL_STORAGE_TOTAL_BYTES: usize = 32 + 4;
#[account]
pub struct Pool {
    pub authority: Pubkey,
    pub user_count: u32,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 8 + POOL_STORAGE_TOTAL_BYTES)]
    pub pool: Account<'info, Pool>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}
