import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorStatkingApp } from "../target/types/anchor_statking_app";

describe("anchor-statking-app", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.AnchorStatkingApp as Program<AnchorStatkingApp>;

  it("Is initialized!", async () => {
    const stakingProgram = anchor.web3.Keypair.generate()
    const poolOwner = (program.provider as anchor.AnchorProvider).wallet
    const tx = await program.methods
      .initialize()
      .accounts({
        pool: stakingProgram.publicKey,
        authority: poolOwner.publicKey,
      })
      .signers([stakingProgram])
      .rpc()
    console.log(`tx ${tx}`)
  });
});
