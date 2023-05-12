import React from 'react'
import CtnPrices from '../Elements/CtnPrices/CtnPrices'
import CtnTitles from '../Elements/CtnTitles/ctnTitles'
import styles from './stylesAboutQuote.module.css'
import Divisas from '../Elements/Divisas/Divisas'
import data from './AboutQuote.json'
import { Viga } from '@next/font/google'
import { Kanit } from '@next/font/google'
import { Timmana } from '@next/font/google'
import dataTwo from '../../userInformation.json'

const Vigaa = Viga ({ 
    subsets: ["latin"], 
    weight: ["400"]
  })
  const inter = Kanit ({ 
    subsets: ["latin"], 
    weight: ["100","200","300","400","500","600","700","800","900"]
  })
  
  const Timman = Timmana ({ 
    subsets: ["latin"], 
    weight: ["400"]
  })

const AboutQuote = () => {

    const today = new Date();
    const date = today.toLocaleDateString();

    const dolar = dataTwo.internalData.dolar

  return (
    <main className={styles.aboutMain}>
        <section className={styles.title}>
            <div className={styles.ctnTtitle}>
                <CtnTitles text={data.titlePrincipal}/>
            </div>
        </section>
        <section className={styles.textOne}>
            <div className={styles.ctnTextOne}>
                <p className={`${Vigaa.className}`}>{data.othertext}</p>
                <p className={`${Vigaa.className} `}>{data.textOne} <span className={styles.textDateAbout}>{date}</span> {data.textTwo} <span className={styles.textDateAbout}>{data.textThree}</span></p>
                <p className={`${Vigaa.className}`}><span className={styles.textDateAbout}>{data.textFour}</span> {data.textFive}</p>
            </div>
        </section>
        <section className={styles.accounts}>
            <div className={styles.ctnAccounts}>
                <div className={styles.ctnTitles}>
                    <h3 className={`${styles.subtitleOne} ${inter.className}`}>{data.titleTwo}</h3>
                    <h3 className={`${styles.subtitleTwo} ${Timman.className}`}>{data.titleThree}</h3>
                </div>
                <div className={styles.ctnAccountsTwo}>
                    <div className={styles.priceProduct}>
                        <h4 className={`${styles.subtitlesThree} ${Vigaa.className}`}>COSTO DEL PRODUCTO</h4>
                        <div className={styles.priceNum}>
                            <div className={`${styles.ctnPriceNum} ${Vigaa.className}`}>{dataTwo.internalData.valueUSD}</div>
                            <p className={`${Vigaa.className}`}>USD</p>
                        </div>
                    </div>
                    <img src="" alt="" />
                    <div className={styles.priceProduct}>
                        <h4 className={`${styles.subtitlesThree} ${Vigaa.className}`}>TARIFA APLICADA </h4>
                        <div className={styles.priceNum}>
                            <div className={`${styles.ctnPriceNum} ${Vigaa.className}`}>{dataTwo.internalData.tarifa}</div>
                            <p className={`${Vigaa.className}`}>USD/Lb</p>
                        </div>
                    </div>
                    <img src="" alt="" />
                    <div className={styles.priceProduct}>
                        <h4 className={`${styles.subtitlesThree} ${Vigaa.className}`}>SEGURO</h4>
                        <div className={styles.priceNum}>
                            <div className={styles.ctnPriceNum}>
                            </div>
                            <p className={`${Vigaa.className}`}>USD</p>
                        </div>
                    </div>
                </div>
                <div className={styles.ctnDivisas}>
                    <Divisas usa={"1 USD"} cop={dolar.toFixed(0)+" COP"}/>
                </div>
            </div>
        </section>
        <section className={styles.finalPrice}>
            <div className={styles.ctnFinalPrice}>
                <div className={styles.finalPriceTEXT}>
                    <h3 className={`${styles.TitlePriceEndOne} ${inter.className}`}>{data.titleFour}</h3>
                    <h3 className={`${styles.TitlePriceEndTwo} ${Timman.className}`}>{data.titleFive}</h3>
                </div>
                <div className={styles.finalPriceNum}>
                    <div className={styles.ctnNumPrice}>
                        <CtnPrices text={dataTwo.internalData.public}/>
                        <p className={`${styles.textCop} ${Vigaa.className}`}>COP</p>
                    </div>
                </div>
            </div>
        </section>
        <section className={styles.ticTac}>
            <div className={styles.ctnTicTac}>
                <p className={`${Vigaa.className}`}>{data.textSeven}</p>
                <p className={`${Vigaa.className}`}>{data.textEight}</p>
            </div>
        </section>
        <section className={styles.orderBtn}>
            <div className={styles.ctnOrderBtn}>
                <div className={styles.newCotizacion}>
                    <h4 className={`${styles.textOneOne} ${inter.className}`}>{data.titleSix}</h4>
                    <h4 className={`${styles.textTwoTwo} ${Timman.className}`}>{data.titleSeven}</h4>
                </div>
                <div className={styles.newOrder}>
                    <div className={styles.ctnNewOrder}>
                        <h4 className={`${styles.textOneOne} ${inter.className}`}>{data.titleEight}</h4>
                        <h4 className={`${styles.textTwoTwo} ${Timman.className}`}>{data.titleNine}</h4>
                    </div>
                </div>
            </div>
        </section>
        
    </main>
  )
}

export default AboutQuote