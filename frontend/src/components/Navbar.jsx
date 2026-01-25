import React, { useState, useRef, useEffect } from 'react';
import { navbarStyles } from '../assets/dummyStyles';
import logo from '../assets/logo.png';
import { NavLink } from "react-router-dom";
import { Home, BookOpen, BookMarked, Users, Contact, Menu, X } from "lucide-react";
import { useClerk, useAuth, UserButton } from "@clerk/clerk-react";

const baseNav = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Courses", icon: BookOpen, href: "/courses" },
    { name: "About", icon: BookMarked, href: "/about" },
    { name: "Faculty", icon: Users, href: "/faculty" },
    { name: "Contact", icon: Contact, href: "/contact" },
];

const Navbar = () => {

    //for clerk
    const { openSignUp } = useClerk();
    const { isLoaded, isSignedIn, getToken } = useAuth();


    //for mobile
    const [isOpen, setIsOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const [isScrolled, setIsScrolled] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);

    const menuRef = useRef(null);
    const isLoggedIn = isSignedIn && Boolean(localStorage.getItem("token"));

    const navItems = isLoggedIn ? [
        ...baseNav,
        { name: "My Courses", icon: Home, href: "/mycourses" }
    ] : baseNav;
    //add token on sign in
    useEffect(() => {
        const loadToken = async () => {
            if (!isLoaded || !isSignedIn) return;

            const token = await getToken();
            localStorage.setItem("token", token);
            console.log("Clerk token:", token);
        };

        loadToken();
    }, [isLoaded, isSignedIn, getToken]);


    //remove token on signOut
    useEffect(() => {
        if (!isSignedIn) {
            localStorage.removeItem("token");
            console.log("clerk Token Removed");
        }
    }, [isSignedIn]);

    useEffect(() => {
        const handleLogout = () => {
            localStorage.removeItem("token");
            console.log("Token removed instantly on Clerk logout event");
        };

        window.addEventListener("user:signed_out", handleLogout);
        return () => window.removeEventListener("user:signed_out", handleLogout);
    }, []);

    // Scroll hide/show
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 20);

            if (scrollY > lastScrollY && scrollY > 100) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            setLastScrollY(scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);
    const desktopLinkClass = (isActive) =>
        `${navbarStyles.desktopNavItem}
        ${isActive ? navbarStyles.desktopNavItemActive : ""}`;

    const mobileLinkClass = (isActive) =>
        `${navbarStyles.mobileMenuItem}
            ${isActive ? navbarStyles.mobileMenuItemActive : navbarStyles.mobileMenuItemHover}`;

    return (
        <nav
            className={`${navbarStyles.navbar}
        ${showNavbar ? navbarStyles.navbarVisible : navbarStyles.navbarHidden}
        ${isScrolled ? navbarStyles.navbarScrolled : navbarStyles.navbarDefault}`}
        >
            <div className={navbarStyles.container}>
                {/* logo*/}
                <div className={navbarStyles.innerContainer}>
                    <div className="flex items-center gap-3 select-none">
                        <img src={logo} alt="Logo" className="w-12 h-12" />
                        <div className='text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-sky-700 to-cyan-600 font-serif leading-[0.95]'>Galaxo</div>
                    </div>

                    {/* desktop*/}
                    <div className={navbarStyles.desktopNav}>
                        <div className={navbarStyles.desktopNavContainer}>
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <NavLink key={item.name} to={item.href} end={item.href === '/'} className={({ isActive }) => desktopLinkClass(isActive)} >
                                        <div className='flex items-center space-x-2'>
                                            <Icon size={16} className={navbarStyles.desktopNavIcon} />
                                            <span className={navbarStyles.desktopNavText}>{item.name}</span>
                                        </div>
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>
                    {/*Right side*/}
                    <div className={navbarStyles.authContainer}>
                        {!isSignedIn ? (
                            <button type="button" onClick={() => openSignUp({})} className={navbarStyles.createAccountButton ?? navbarStyles.loginButton}>
                                <span>Create Account</span>
                            </button>
                        ) : (
                            <div className='flex items-center'>
                                <UserButton afterSignOutUrl="/"></UserButton>
                            </div>
                        )}

                        {/*toogle */}
                        <button onClick={() => setIsOpen(!isOpen)} className={navbarStyles.mobileMenuButton}>
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* mobile nav*/}
                <div ref={menuRef} className={`${navbarStyles.mobileMenu} ${isOpen ? navbarStyles.mobileMenuOpen : navbarStyles.mobileMenuClosed}`}>
                    <div className={navbarStyles.mobileMenuContainer}>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink key={item.name} to={item.href} end={item.href === '/'} className={({ isActive }) => mobileLinkClass(isActive)} onClick={() => setIsOpen(false)}>
                                    <div className={navbarStyles.mobileMenuIconContainer}>
                                        <Icon size={18} className={navbarStyles.mobileMenuIcon} />
                                    </div>
                                    <span className={navbarStyles.mobileMenuText}>
                                        {item.name}
                                    </span>
                                </NavLink>
                            );
                        })}
                        {!isSignedIn ? (
                            <button type="button" onClick={() => {
                                openSignUp({});
                                setIsOpen(false)
                            }} className={navbarStyles.mobileCreateAccountButton ?? navbarStyles.mobileLoginButton}>
                                <span>Create Account</span>
                            </button>
                        ) : (
                            <div className='px-4 py-2'>
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={navbarStyles.backgroundPattern}>
                <div className={navbarStyles.pattern}></div>
            </div>
        </nav>
    );
};

export default Navbar;
