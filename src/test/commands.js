// выполняется в консоли truffle

const instance = await NftMarket.deployed()

instance.mintToken(
  "https://turquoise-real-emu-463.mypinata.cloud/ipfs/Qmf8FCvMECJWJznQuT1cFqaak4oqmokvsUHDeqFnGSu1fj",
  "500000000000000000",
  {
    value: "25000000000000000",
    from: accounts[0],
  }
)

instance.mintToken(
  "https://turquoise-real-emu-463.mypinata.cloud/ipfs/QmNepN6jQfKeyJDcPWjLT1ueLcKCp9ToRwoVyjKxSLZE6L",
  "300000000000000000",
  {
    value: "25000000000000000",
    from: accounts[0],
  }
)
