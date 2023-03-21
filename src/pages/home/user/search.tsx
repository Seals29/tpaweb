import Card from "@/pages/components/card";
import Pagination from "@/pages/components/pagination";
import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import style from "@/styles/homes.module.css"
import { ThemeContext } from "@/theme/theme";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
export default function search(searchedProduct: any, searching : string) {
    const routers = useRouter()
    // console.log(routers.query.val);
    const { theme } = useContext(ThemeContext)
    const [searched, setSearched] = useState([])
    // const [searchedProducts, setSearchedProducts] = useState([])
    // console.log(searchedProduct);

    console.log(searchedProduct);
    console.log(searchedProduct.searching.length);
    const [currSearchPage, setCurrSearchPage] = useState(1)
    const totalSearched = searchedProduct.searchedProducts.length;
    const size = 10;
    const pages = Math.ceil(searchedProduct.searchedProducts.length/size)
    const startIDX = (currSearchPage-1) * 10
    const endIDX = (startIDX+10)
    const searchOnPage = searchedProduct.searchedProducts.slice(startIDX,endIDX)
    // console.log);
    const changePageHandler = (pageNumber: any) => {
        setCurrSearchPage(pageNumber)
    }
    return (
        <div style={{display:searchedProduct.searching.length===0?"none":""}}>
            {/* <header>
                <Navbar />
            </header> */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.background
            }}>
                <div style={{
                    padding: '15px',
                    color: theme.text
                }}>
                    <h1>Searched : {routers.query.val}</h1>
                </div>

                <div style={{ backgroundColor: theme.background, margin: '0' }} >
                    <div className={style.cardcontainers} style={{ backgroundColor: theme.background }}>
                        {searchOnPage.map((idx: any) => (
                            <div className={style.usercontainer} onClick={(e) => {
                                e.preventDefault()
                                console.log(idx.ID)
                                routers.push(`home/user/product/${idx.ID}`)
                            }} style={{ backgroundColor: theme.background, cursor: 'pointer' }}>
                                <Card name={idx.name} image={idx.image} description={idx.description} rating={idx.rating} category={idx.category} detail={idx.detail} stock={idx.stock} price={idx.price} />
                            </div>
                        ))}
                    </div>
                    <Pagination currentPage={currSearchPage} totalPages={pages} onPageChange={changePageHandler}/>
                </div>
            </div>
        </div>
    )
}