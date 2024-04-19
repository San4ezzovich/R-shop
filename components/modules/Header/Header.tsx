'use client'
import React from 'react';
import {useLang} from "@/hooks/useLang";
import Logo from "@/components/elements/logo/Logo";
import "@/app/globalStyles/header.scss"
import Link from "next/link";
import Menu from "@/components/modules/Header/Menu";
import {useDispatch} from "react-redux";
import {toggleMenu} from "@/features/menu/menuSlice";
import {toggleSearch} from "@/features/menu/headerSearch";
import SearchModal from "@/components/modules/Header/SearchModal";
import CartPopup from "@/components/modules/Header/CartPopup";

const Header = () => {
    const {lang, translations} = useLang();
    const dispatch = useDispatch();

    const handleSearchClick = () =>{
        dispatch(toggleSearch(1))
    }

    const handleMenuClick = () =>{
        dispatch(toggleMenu(1))
    }

    return (
        <div className='headerContainer'>
            <div className="header">
                <div className="menuBtn" onClick={handleMenuClick}>{translations[lang].header.menuBtn}</div>
                <div className="headerLogo"><Logo/></div><Menu /> <SearchModal />
                <ul className="headerNav d-flex">
                    <li className="headerItem"><button onClick={handleSearchClick} className="headerItemLink headerItemLink--search" /></li>
                    <li className="headerItem "><Link href='/' className="headerItemLink headerItemLink--likes" /></li>
                    <li className="headerItem "><Link href='/' className="headerItemLink headerItemLink--suffix" /></li>
                    <li className="headerItem "><CartPopup /></li>
                    <li className="headerItem "><Link href='/' className="headerItemLink headerItemLink--client" /></li>
                </ul>
            </div>
        </div>
    );
};

export default Header;