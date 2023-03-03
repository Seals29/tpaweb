import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import axios from "axios";
import style from "@/styles/wishlist.module.css"
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/theme/theme";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
export default function wishlistdetail(props: any) {
    const { wishlistdetail, detail,products
    } = props
    const [wishName, setWishName] = useState('')
    const { theme } = useContext(ThemeContext)
    const [currWishList, setCurrWishList] = useState([])
    // console.log(detail)
    const routers = useRouter()
    console.log(props)
    const [number, setNumber] = useState('')
    const [currUser, setCurrUser] = useState([])
    useEffect(() => {
        const cookies = Cookies.get('token')

        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
        }).catch(err => {
            console.log(err)
            routers.push('/login')
        })
        if (detail == undefined) {
            console.log("Undefineddd")
            console.log(routers.asPath)
            setNumber(routers.asPath[routers.asPath.length - 1])
            const data = {
                Id: routers.asPath[routers.asPath.length - 1]
            }
            axios.post(`http://localhost:9998/getDWbyID`, data).then(res => {
                console.log(res.data)
                setCurrWishList(res.data)
            }).catch(err => {
                console.log(err)
            })
            console.log(products)
        } else {
            // const idString = String(detail)
            const data = {
                Id: detail
            }
            axios.post(`http://localhost:9998/getDWbyID`, data).then(res => {
                console.log(res.data)
                setCurrWishList(res.data)
            }).catch(err => {
                console.log(err)
            })
            console.log(data)

        }


    }, [])
// console.log()
    useEffect(()=>{
        console.log("asdasdasad")
        console.log(products)
        // products.forEach(element => {
        //     console.log(element)
        // });
    },[])
    console.log(number)
    console.log(wishlistdetail)
    const handleManage = (e: any) => {

    }
    const handleNotes = (e: any) => {

    }
    const handleStatus = (e: any) => {

    }
    const handleAddToCart = (e: any) => {

    }

    const handleDelete = (e: any) => {

    }
    return (
        <div style={{
            backgroundColor: theme.background2
        }}>
            <Navbar />

            <div className={style.heading} style={{color:theme.text}}>
                {currWishList.name}
            </div>
            <button>
                Update WishList
            </button>
            <button>Delete WishList</button>
            <button>Add Product</button>
            <button>Update Notes</button>
            <button>Deteltem Item In List</button>

            <HomeFooter />
        </div>
    )

}

export async function getStaticPaths() {
    try {
        const res = await axios.get("http://localhost:9998/getallwishlist")
        const allWishlist = await res.data;
        // console.log(allWishlist)
        const paths = allWishlist.map((wishlist: any) => ({
            params: {
                detail: String(wishlist.id),
            },
        }));
        return {
            paths,
            fallback: true,
        };
    } catch (error) {
        // alert(error)
        return {
            notFound: true,
        };
    }

}
export async function getStaticProps(context: any) {
    const { detail } = context.params;

    const res = await axios.get(`http://localhost:9998/getwishlistdetailbywishlistid/${detail}`)
    const res2 = await axios.get(`http://localhost:9998/getallproduct`)
    const wishlistdetail = await res.data;
    const products = await res2.data;
    return {
        props: {
            wishlistdetail,
            detail,
            products
        }
    }
}
