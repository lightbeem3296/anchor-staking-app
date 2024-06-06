use anchor_lang::prelude::*;

declare_id!("HdEjaNvBTx7WsfrXP1dReQ7Jm536DycbSAPwiqDTaeem");

#[program]
pub mod anchor_statking_app {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
