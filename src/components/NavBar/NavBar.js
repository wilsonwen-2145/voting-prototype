import "./NavBar.css"

import React, { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import Grid from "@mui/material/Grid"

import logoImg from "../../assets/img/logo.png"

import { connectWallet, getCurrentWalletConnected } from "../../helpers/wallet"
import { NotificationManager } from "react-notifications"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../context"

export const NavBar = () => {
  const [tool, setTool] = React.useState(false)
  const { walletAddress, handleWalletAddress } = useContext(AppContext)
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = React.useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const initDatas = async () => {
      if (window.ethereum) {
        setIsMetaMaskInstalled(true)
        const { address } = await getCurrentWalletConnected()
        handleWalletAddress(address)
        onChangeWalletListener()
        onConnectWalletHandler()
      } else {
        setIsMetaMaskInstalled(false)
        NotificationManager.success("🦊 You must install MetaMask in your browser")
      }
    }
    initDatas()
  }, [])

  const onConnectWalletHandler = async () => {
    const walletResponse = await connectWallet()
    handleWalletAddress(walletResponse.address)
  }

  const onDisconnectWalletHandler = () => {
    handleWalletAddress("")
    NotificationManager.info("Wallet disconnected")
  }

  const onChangeWalletListener = async () => {
    if (isMetaMaskInstalled) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length) {
          handleWalletAddress(accounts[0])
        } else {
          handleWalletAddress("")
        }
      })

      window.ethereum.on("chainChanged", () => {
        onConnectWalletHandler()
      })
    }
  }

  const toolsChanged = (event) => {
    navigate(event.target.value, { replace: true })
  }

  const logoImgClicked = () => {
    navigate("/", { replace: true })
  }

  const levelUpBtnClicked = () => {
    navigate("/levelup", { replace: true })
  }

  const treasuryBtnClicked = () => {
    navigate("/treasury", { replace: true })
  }

  const renderWalletButton = () => {
    if (!isMetaMaskInstalled) {
      return (
        <button
          className="navBtn"
          onClick={() => window.open("https://metamask.io/download.html", "_blank")}
        >
          Install Wallet
        </button>
      )
    } else if (walletAddress === "") {
      return (
        <button className="navBtn" onClick={onConnectWalletHandler}>
          Connect Wallet
        </button>
      )
    } else {
      return (
        <button className="navBtn" onClick={onDisconnectWalletHandler}>
          Disconnect Wallet
        </button>
      )
    }
  }

  return (
    <div>
      <div className="navArea">
        <Grid container>
          <Grid item xs={12} md={6} lg={4}>
            <div className="logoImg" onClick={logoImgClicked}>
              <img src={logoImg} alt=""></img>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="inputDiv">
              <input type="text" placeholder="Search" className="searchInput" />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="navBtns">
              <div className="navBtnWrappedDiv">
                <Link to="/listcoin">
                  <button className="navBtn" type="button">
                    List Coin
                  </button>
                </Link>
              </div>
              <div className="navBtnWrappedDiv">
                <Link to="/promote">
                  <button className="navBtn" type="button">
                    Promote
                  </button>
                </Link>
              </div>
              <div className="navBtnWrappedDiv">{renderWalletButton()}</div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div className="btnArea">
        <button id="cryptocurrenciesBtn">Cryptocurrencies</button>
        <select
          id="selectTools"
          className="selectTools"
          onChange={toolsChanged}
          placeholder="Tools"
          onFocus={() => setTool(true)}
        >
          <option style={{ display: tool ? "none" : "hidden" }}>Tools</option>
        </select>

        <button id="treasuryBtn" onClick={treasuryBtnClicked}>
          Buy Back Treasury
        </button>
        <button id="lotteryBtn">Lottery</button>
        <button id="stakingBtn">Staking</button>
        <button id="levelUpBtn" onClick={levelUpBtnClicked}>
          Level Up
        </button>
      </div>
    </div>
  )
}

export default NavBar
