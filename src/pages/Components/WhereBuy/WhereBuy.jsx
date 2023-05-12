import React, { useState } from 'react'
import { BtnGreen, TwoBtnGreen } from '../Elements/Buttons/BtnGreen/btnGreen'
import CtnTitles from '../Elements/CtnTitles/ctnTitles'
import Number from '../Elements/Numbers/Number'
import Pagination from '../Elements/Pagination/Pagination'
import Stores from '../Elements/stores/stores'
import styles from "./stylesWhereBuy.module.css"
import data from './dataWheteBuy.json'
import { Viga } from '@next/font/google'
import Link from 'next/link'
import useSelectSotore from '../whatBring/hooks/useSelectSotore'
import SendIcon from '@mui/icons-material/Send';


const Vigaa = Viga ({ 
    subsets: ["latin"], 
    weight: ["400"]
  })



const WhereBuy = () => {

    const [isShop, shop, ChangeShop] = useSelectSotore()
    const [block, setBlock] = useState(true)
    const [next, setNext] = useState(true)

    const BtnBlock = ()=> { 
        setBlock(false)
    }

    const ChangeStore = (e)=>{ 
        const a = event.target.value
        ChangeShop(a)
        if (a.length > 0) { 
            setBlock(false)
            setNext(false)
        }
        else { 
            setBlock(true)
            setNext(true)
        }
    }

    const activeOther = ()=> { 
        document.getElementById("input").style.display="flex"
    }
    const closeOther = ()=> { 
        document.getElementById("input").style.display="none"
        BtnBlock()
        setNext(false)
    }

    const btnBackFalse = false

  return (
    <main className={styles.mainWhere}>
        <section className={styles.title}>
            <div className={styles.ctnTitle}>
                <div className={styles.ctnNumberTitle}>
                    <Number number={data.number}/>
                </div>
                <div className={styles.ctnTitleTwo}>
                    <CtnTitles text={data.title}/> 
                </div>
            </div>
        </section>
        <section className={styles.text}>
            <div className={styles.ctnText}>
                <div className={styles.ctnTextTwo}>
                    <p className={`${Vigaa.className }`}>{data.textOne} <span className={`${Vigaa.className } ${styles.textRed}`}>{data.textTwo} </span> {data.textThree} </p>
                </div>
                <p className={`${Vigaa.className }`}>{data.textFour}</p>
            </div>
        </section>
        <div className={styles.ctnStoresPrincipal}>
            <section className={styles.stores}>
                <div className={styles.ctnStore}>
                    <Stores Close={closeOther}/>
                </div>
            </section>
            <div className={styles.ctnOtherElements}>
                <section className={styles.other}>
                    <div className={styles.ctnOther} onClick={activeOther}>
                        <BtnGreen text={data.textBtnOne} ids={"one"}/>
                    </div>
                </section>
                <div className={styles.input} id="input">
                        <h2 className={`${Vigaa.className }`} >INGRESA EL LINK</h2>
                        <input  className={`${Vigaa.className } ${styles.blockInput}`} type="text" placeholder='Ingresa el link' onChange={()=>{ 
                            ChangeStore()
                        }}/>
                        <Link  href={block ? "" : "./windowCalculate"}  className={styles.ctnSend}>
                            <SendIcon className={styles.sendIcon}/>
                            <p className={`${Vigaa.className}`}>Enviar</p>
                        </Link >
                </div>
                <section className={`${styles.btnLeft} ${styles.btntransOne}`}>
                    <Link href={"./WindowWhatBrig"} className={styles.linkNext}>
                        <TwoBtnGreen text={data.textBtnBack} ids={"three"} block={btnBackFalse}/> 
                    </Link>
                </section>
            </div>
        </div>
        <section className={`${styles.btnLeft} ${styles.btntransTwo}`}>
            <Link href={"./WindowWhatBrig"} className={styles.linkNext}>
                <TwoBtnGreen text={data.textBtnBack} ids={"three"} block={btnBackFalse}/> 
            </Link>
        </section>  
        <section className={styles.pagination}>
                <Pagination number={2} text={"Proceso de tu cotizacion"}/>
        </section>
    </main>
  )
}

export default WhereBuy