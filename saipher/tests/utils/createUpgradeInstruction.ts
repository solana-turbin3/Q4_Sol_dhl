import {
    PublicKey,
    SYSVAR_CLOCK_PUBKEY,
    SYSVAR_RENT_PUBKEY,
    TransactionInstruction,
} from '@solana/web3.js'

export async function createUpgradeInstruction(
    programId: PublicKey,
    bufferAddress: PublicKey,
    upgradeAuthority: PublicKey,
    spillAddress: PublicKey
) {
    const bpfUpgradableLoaderId = new PublicKey("BPFLoaderUpgradeab1e11111111111111111111111")
    const [programDataAddress] = PublicKey.findProgramAddressSync(
        [programId.toBuffer()],
        bpfUpgradableLoaderId
    )

    const keys = [
        {
            pubkey: programDataAddress,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: programId,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: bufferAddress,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: spillAddress,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: SYSVAR_RENT_PUBKEY,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: SYSVAR_CLOCK_PUBKEY,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: upgradeAuthority,
            isWritable: false,
            isSigner: true,
        },
    ]

    return new TransactionInstruction({
        keys,
        programId: bpfUpgradableLoaderId,
        data: Buffer.from([3, 0, 0, 0]), // Upgrade instruction bincode
    })
}