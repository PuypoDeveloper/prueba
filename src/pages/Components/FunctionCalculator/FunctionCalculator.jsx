import React, { useEffect, useState } from 'react'
import { BtnGreen, TwoBtnGreen } from '../Elements/Buttons/BtnGreen/btnGreen'
import Pagination from '../Elements/Pagination/Pagination'
import styles from './stylesFuntionCalculator.module.css'
import data from './dataFunctionCalculator.json'
import Link from 'next/link'
import CtnTitles from '../Elements/CtnTitles/ctnTitles'
import Number from '../Elements/Numbers/Number'
import Divisas from '../Elements/Divisas/Divisas'
import { Viga } from '@next/font/google'
import { Timmana } from '@next/font/google'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import dataTwo from '../../userInformation.json'
import dataThree from '../../Password.json'
import { GoogleSpreadsheet } from "google-spreadsheet";
import gsap from 'gsap'
import { border } from '@mui/system'
import ModalBase from '../Elements/modales/ModalBase'
import useModalGoodHome from '../Elements/modales/hooks/modalGoodHome'
import useModalSend from '../Elements/modales/hooks/modalSend'



const Vigaa = Viga ({ 
    subsets: ["latin"], 
    weight: ["400"]
  })

  const Timman = Timmana ({ 
    subsets: ["latin"], 
    weight: ["400"]
  })

const FunctionCalculator = () => {

    /** FECHA */

    const today = new Date();
    const date = today.toLocaleDateString();
    dataTwo.internalData.date = date
    dataTwo.publicData.date = date

const [money, setMoney] = useState("")

const [open, HandleOPen, CloseModalGood] = useModalGoodHome()
const [openTwo, HandleOPenTwo, CloseModalGoodTwo] = useModalSend()

    const openModalTwoSend = () => {
        HandleOPenTwo()
    }

    const enterValue = (e) => { 
        const a = event.target.value
        setMoney(a)
        if (a >= 2500) { 
            HandleOPen()           
        }
        if (a>0) { 
            setBlock(false)
        }
        else if (a<=0 ) { 
            setBlock(true)
        }
    }

    dataTwo.internalData.valueUSD = money

    useEffect(()=> { 
        if (dataTwo.internalData.Shop === "Amazon"){ 
            document.getElementById("tax").innerHTML = "No aplica"
        }
        else  { 
            const a = money*0.07
            document.getElementById("tax").innerHTML = a.toFixed(2)
        }
    },[money])

    /**PESO DE PRODUCTOS */

    const [weight, setWeight] = useState(0)

    useEffect(()=> { 
        if (dataTwo.publicData.typeProduct === "Celular" || dataTwo.publicData.typeProduct === "Laptop" || dataTwo.publicData.typeProduct === "Tablet") { 
            setWeight(11)
            document.getElementById("weight").value = 11
            document.getElementById("weight").disabled = true
            dataTwo.internalData.weight = 11
            setBlockThree(false)
        }
        else if (dataTwo.publicData.typeProduct === "CPU" || dataTwo.publicData.typeProduct === "M2" || dataTwo.publicData.typeProduct === "RAM" || dataTwo.publicData.typeProduct === "SSD") { 
            setWeight(3)
            document.getElementById("weight").value = 3
            document.getElementById("weight").disabled = true
            dataTwo.internalData.weight = 3 
            setBlockThree(false)

        }
        else if(dataTwo.publicData.typeProduct === "Motherboard") { 
            setWeight(7)
            document.getElementById("weight").value = 7
            document.getElementById("weight").disabled = true
            dataTwo.internalData.weight = 7
            setBlockThree(false)

        }
        else if (dataTwo.publicData.typeProduct === "HDD") { 
            setWeight(4)
            document.getElementById("weight").value = 4
            document.getElementById("weight").disabled = true
            dataTwo.internalData.weight = 4
            setBlockThree(false)

        }
        else { 
            setWeight(inputOne)
        }
    },[weight]) 



    /**CAPTURAR INPUT */

    const [inputOne, setInputOne] = useState("")

    const CaptureInput = (e)=> { 
        const a = event.target.value
        setInputOne(a)
        dataTwo.internalData.weight=a
        if (a>0) { 
            setBlockOne(false)
        }
        else if (a<=0 ) { 
            setBlockOne(true)
        }

    }

    useEffect(()=> { 
        dataTwo.internalData.weight = inputOne
    },[inputOne])

    /** VALOR DOLAR */

    const url = "https://api.exchangerate.host/convert?from=USD&to=COP";
    const [dolar, setDolar] = useState(0)

    fetch(url, {cache: "no-store"})
        .then(response => response.json())
        .then(data => {
            const result = data.result;
            dataTwo.internalData.dolar = result
            setDolar(result)
            console.log(`1 USD equivale a ${result} COP`);
        })
        .catch(error => {
            console.error("Error al consumir la API", error);
        });

    /**CALCULO DE VARIABLES */

       /**CALCULO TARIFA */
       const [tariff, setTariff] = useState("")

       useEffect(()=> {
           if (dataTwo.internalData.valueUSD <= 500) { 
               const tarifa = 4.5*dataTwo.internalData.weight
               setTariff(tarifa)
               dataTwo.internalData.tarifa = tarifa
           }
           else if (dataTwo.internalData.valueUSD >500 && dataTwo.internalData.valueUSD < 850) { 
               const tarifa = 5.5*dataTwo.internalData.weight
               setTariff(tarifa)
               dataTwo.internalData.tarifa = tarifa
           }
           else if (dataTwo.internalData.valueUSD >= 850) { 
               const tarifa = 6*dataTwo.internalData.weight
               setTariff(tarifa)
               dataTwo.internalData.tarifa = tarifa
           }
           
       },[dataTwo, money, weight, inputOne])
   
       /**CALCULO ARANCEL */
   
       const [arancel, setArancel] = useState("")
       
       useEffect(()=> { 
           const a = tariff*(dataTwo.internalData.dolar+170)
           dataTwo.internalData.arancel = a
           setArancel(a)
       },[tariff, dataTwo,money,inputOne])
   
       /**CALCULO SUBTOTAL */
   
       const [subtotal, setSubtotal] = useState("")
       let USDT = dataTwo.internalData.dolar-40
       console.log(USDT)
       useEffect(()=>{ 
           if(dataTwo.internalData.Shop === "Amazon") { 
               const a = arancel+(dataTwo.internalData.valueUSD*USDT)
               dataTwo.internalData.subtotal = a
               setSubtotal(a)
   
           }
           else { 
               const a = arancel+(dataTwo.internalData.valueUSD*(dataTwo.internalData.dolar+170))
               dataTwo.internalData.subtotal = a
               setSubtotal(a)
   
           }
       },[dataTwo, arancel, USDT, money,inputOne])
   
       /**CALCULO TOTAL */
   
       let total = ((subtotal/1000)*8)+subtotal
       dataTwo.internalData.total = total
   
       /**PUBLICO */
   
       let publico = total*1.06
       dataTwo.internalData.public = publico.toFixed(0)

    /**ENVIO DE DATOS AL EXCEL */

    const a = JSON.stringify(dataTwo)
    const newData = JSON.parse(a)

    const [ctn, setCtn] = useState(newData)
    const [verify, setVerify] = useState(false)
    
    const sendAllData = ()=> { 
            event.preventDefault()
            setCtn(newData)
            setVerify(true)
        }
    
    console.log(ctn)

    /**ENVIO DE DATOS PUBLIC */

    useEffect(()=> { 
        // Config variables
        if (verify) { 
    const SPREADSHEET_ID = "1fhYYSoy2PJoKlpvC7vuk7tSDn6mxe7DIa1KUpZmWoSc";
    const SHEET_ID = "339346851";
    const CLIENT_EMAIL = dataThree.client_email;
    const PRIVATE_KEY = dataThree.private_key;

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    const appendSpreadsheet = async (row) => {
    try {
        await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
        });
        // loads document properties and worksheets
        await doc.loadInfo();

        const sheet = doc.sheetsById[SHEET_ID];
        const result = await sheet.addRow(row);


    } catch (e) {
        console.error('Error: ', e);
    }
    };

    const newRow = { TypeProduct: ctn.publicData.typeProduct , NameProduct: ctn.publicData.nameProduct, Date: ctn.publicData.date, PriceProduct: ctn.internalData.public};

    appendSpreadsheet(newRow);
    }

    },[ctn])
    
    /**ENVIO DE DATOS INTERNAL */

    useEffect(()=> { 
    // Config variables

    if (verify) { 

    const SPREADSHEET_ID = "1JFXUaJ1BcxtO71Cl28LSIQHUfEJmv65r4JLKnKrAS_Y";
    const SHEET_ID = "249907480";
    const CLIENT_EMAIL = dataThree.client_email;
    const PRIVATE_KEY = dataThree.private_key;

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    const appendSpreadsheet = async (row) => {

    try {
        await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
        });
        // loads document properties and worksheets
        await doc.loadInfo();

        const sheet = doc.sheetsById[SHEET_ID];
        const result = await sheet.addRow(row);


    } catch (e) {
        console.error('Error: ', e);
    }
    };

    const newRow = { TypeProduct: ctn.internalData.typeProduct, NameProduct: ctn.internalData.nameProduct, Date: ctn.internalData.date, Shop: ctn.internalData.Shop, Seller: ctn.internalData.seller, ValueUSD: ctn.internalData.valueUSD, Tarifa: ctn.internalData.tarifa, Total: ctn.internalData.total, Link: ctn.internalData.link};

    appendSpreadsheet(newRow);
    }

    },[ctn])

    /** FUNCION BLOCK BTN */

    const [block, setBlock] = useState(true)
    const [blockOne, setBlockOne] = useState(true)
    const [blockThree, setBlockThree] = useState(true)
    const [blockTwo, setBlockTwo] = useState(true)
    
    const BtnBlock = ()=> { 
        if (block === false && blockOne === false) { 
            setBlockTwo(false)
        }
        else if (block === false && blockThree === false){ 
            setBlockTwo(false)
        }
        else if (block === true || blockOne === true) { 
            setBlockTwo(true)
        }
    }

    useEffect(()=> { 
        BtnBlock()
    },[block, blockOne, weight])


    /** CAMBIO DE DIVISA */

    const [copPrice, setCopPrice] = useState("")

    const ChangeDivisa = () => { 
        const a = (money*0.07)*dolar
        setCopPrice(a)
        document.getElementById("tax").innerHTML = a.toFixed(0)
        document.getElementById("taxUSD").style.display= "none"
        document.getElementById("taxCOP").style.display="flex"
    }

    /**ACTIVAR ANIMACION */

    const activeAnimation = ()=> {
        if (blockTwo === false) {
        let tl1 = gsap.timeline({ 
            repeat: 0,
        });
        let tl2 = gsap.timeline({ 
            repeat: 0,
        });
        tl1.to(("#divBtn"), { 
            duration: 0.25,
            backgroundColor: "#ec6e73",
            border: "none"
            
        })
        tl2.to(("#btnCalculate"), { 
            duration: 0.25 ,
            backgroundColor: "#ec6e73",
            border: "none",
            color: "#fff"
        })
        }
    }

    const AnimationOff = () => { 
        if (blockTwo === false) {
        let tl1 = gsap.timeline({ 
            repeat: 0,
        });
        let tl2 = gsap.timeline({ 
            repeat: 0,
        });
        tl1.to(("#divBtn"), { 
            duration: 0.5,
            backgroundColor: "#46eab300",
            border: "2px solid #46eab3",
            color: "black"
        })
        tl2.to(("#btnCalculate"), { 
            duration: 0.5 ,
            backgroundColor: "#46eab3",
            color: "black",
            border: "none"
        })
        }
    }

    const btnBackFalse = false

  return (
    <main className={styles.mainFunctionCalculator}>
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
                <p className={`${Vigaa.className}`}>{data.textOne}</p>
                <div className={styles.ctnTextTwo}>
                    <p className={`${Vigaa.className}`}>{data.textTwo}</p>
                    <p className={`${Vigaa.className} ${styles.textColor}`} onClick={ChangeDivisa}>{data.textThree}</p>
                    <p className={`${Vigaa.className}`}>{data.textFour}</p>
                </div>
            </div>
        </section>
        <section className={styles.changeDivisa}>
            <div className={styles.ctnChangeDivisa}>
                <Divisas usa={"1 USD"} cop={dolar.toFixed(0)+" COP"}/>
            </div>
        </section>
        <section className={styles.formCalculate}>
            <div className={styles.ctnFormCalculate}>
                <div className={styles.iconSum}>
                    <h2 className={`${Timman.className}`}>+</h2>
                </div>
                <div className={styles.ctnInputs}>
                    <div className={styles.ctnIputTwo}>
                        <div className={styles.value}>
                            <p className={`${styles.titleInput} ${Vigaa.className}`}>VALOR</p>
                            <input className={`${Vigaa.className} ${styles.inputBorderRed}`} type="number" placeholder='¿cuánto cuesta?' onChange={()=>{
                                enterValue()
                            }}/>
                            <p className={`${styles.valueUSD} ${Vigaa.className}`}>USD</p>
                            <div className={styles.iconAsk}>
                                <HelpOutlineIcon/>
                            </div>
                        </div>
                        <div className={styles.tax}>
                            <p className={`${styles.titleInput} ${Vigaa.className}`}>TAX</p>
                            <div className={`${Vigaa.className } ${styles.otherInput}`}  type="text" id="tax"> -</div>
                            <p className={`${styles.valueUSD} ${Vigaa.className}`} id="taxUSD">USD</p>
                            <p className={`${styles.valueCOP} ${Vigaa.className}`} id="taxCOP">COP</p>
                            <div className={styles.iconAsk}>
                                <HelpOutlineIcon/>
                            </div>
                        </div>
                        <div className={styles.peso}>
                            <p className={`${styles.titleInput} ${Vigaa.className}`}>PESO</p>
                            <input className={`${styles.inputWeight} ${Vigaa.className }`} type="text" placeholder='¿cuánto pesa?' id= "weight" onChange={()=>{ 
                                CaptureInput()
                            }}/>
                            <p className={`${styles.valueUSD} ${Vigaa.className}`}>Lbs</p>
                            <div className={styles.iconAsk}>
                                <HelpOutlineIcon/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <ModalBase 
                textOne={data.textModalOne}
                textTwo={data.textModalTwo}
                textBtnOne={data.textModalBtnOne}
                textBtnTwo={data.textModalBtnTwo}
                openModal={open}
                CloseModalTwo={CloseModalGood}
                btn={false}
            />
        </section>
        <section className={styles.sure}>
            <div className={styles.ctnSure}>
                <input type="checkbox" id= "activar" className={`${styles.checkbox} ${Vigaa.className }`} />
                <div className={styles.ctnTextSure}>
                    <p className={`${styles.texboxONe} ${Vigaa.className}`} >{data.textFive}</p>
                    <div className={styles.ctnHere}>
                        <p className={`${styles.texboxONe} ${Vigaa.className}`} >{data.textSix}</p>
                        <p className={`${styles.texboxONeHere} ${Vigaa.className}`} >{data.textHere}</p>
                    </div>
                </div>
            </div>
            <div className={styles.ctnLine}></div>  
        </section>
        <section className={styles.ctnBtnCalculate}>
            <div className={styles.ctnButtonCalculate} onMouseMove={activeAnimation} id="divBtn" onMouseLeave={AnimationOff} onClick={openModalTwoSend}>
                <button className={`${Vigaa.className} ${blockTwo ? styles.btnGreenTwo: styles.btnGreen}`} id="btnCalculate" onMouseMove={activeAnimation}> 
                    CALCULAR
                </button>
            </div>
        </section>
        <section>
            <ModalBase 
                textTwo={data.textModal2_Two}
                textBtnOne={data.textModal2_BtnOne}
                textBtnTwo={data.textModal2_BtnTwo}
                openModal={openTwo}
                CloseModalTwo={CloseModalGoodTwo}
                btn={true}
                sendJSON={sendAllData}
            />
        </section>

        <div className={styles.ctnFoot}>   
            <section className={styles.pagination}>
                <div className={styles.ctnPagination}>
                    <Pagination number={3} text={"Proceso de tu cotizacion"}/>
                </div>
            </section>
            <section className={styles.btnBack}>
                <Link href={"./windowWhereBuy"} className={`${styles.btnBackNext}`}>
                    <TwoBtnGreen text={data.textBtnBack} ids={"two"} block={btnBackFalse}/>
                </Link>
            </section>
            <section className={styles.btnNext}>
                <div className={`${styles.btnBackNext}`} onClick={()=> { 
                    openModalTwoSend()
                     }}>
                    <TwoBtnGreen text={data.textBtnNext} ids={"three"} block={blockTwo}/>
                </div>
            </section>
        </div>

    </main>
  )
}

export default FunctionCalculator