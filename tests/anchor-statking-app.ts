import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorStatkingApp } from "../target/types/anchor_statking_app";
import { expect } from "chai";

describe("anchor-statking-app", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.AnchorStatkingApp as Program<AnchorStatkingApp>;
  const stakingProgram = anchor.web3.Keypair.generate()
  const poolOwner = (program.provider as anchor.AnchorProvider).wallet

  it("Is initialized!", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        pool: stakingProgram.publicKey,
        authority: poolOwner.publicKey,
      })
      .signers([stakingProgram])
      .rpc()
    console.log(`tx ${tx}`)

    const state = await program.account.pool.fetch(stakingProgram.publicKey)
    console.log(`state ${JSON.stringify(state)}`)
    expect(state.authority.toString()).to.equal(poolOwner.publicKey.toString())
    expect(state.userCount).to.equal(0)
  })

  it('is user created!', async () => {
    const userAccount = provider.wallet
    const [userPDA, _] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode('user'),
        userAccount.publicKey.toBuffer(),
      ],
      program.programId
    )

    const tx = await program.methods
      .createUser()
      .accounts({
        user: userPDA,
        authority: userAccount.publicKey,
        pool: stakingProgram.publicKey,
      })
      .rpc()
    console.log(`tx ${tx}`)

    const state = await program.account.pool.fetch(stakingProgram.publicKey)
    console.log(`state ${JSON.stringify(state)}`)
    expect(state.userCount).to.equal(1)
    const user = await program.account.user.fetch(userPDA)
    console.log(`user ${JSON.stringify(user)}`)
    expect(user.stake.toNumber()).to.equal(0)
  })
});
