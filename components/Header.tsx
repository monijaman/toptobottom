// components/Header.tsx
import Link from "next/link";

export default function Header() {
    return (
        <header >
            <Link href="/">
                <img src="/static/logo.svg" alt="" >
            </Link>
            <Link href="/">
                <h1 >FishCastle</h1>
            </Link>
            <a href="#" style={{textDecoration: "none"}}>
                <svg width="31" height="27" viewBox="0 0 31 27" fill="none" xmlns="<http://www.w3.org/2000/svg>">
                    <path d="" fill="#9094FF"/>
                </svg>
                <span></span>
            </a>
        </header>
    )
}