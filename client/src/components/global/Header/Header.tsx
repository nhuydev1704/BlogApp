import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RootStore } from '../../../utils/TypeScript';
import Search from '../Search';
import useStyles from './style';
import { logout } from '../../../redux/actions/authAction'

export default function Header() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const { pathname } = useLocation()
    // const isActive = (pn: string) => {
    //     if (pn === pathname) return 'active';
    // }

    let { auth } = useSelector((state: RootStore) => state);
    const dispatch = useDispatch();

    const bfLoginLinks = [
        { label: 'Đăng Ký', path: '/register', icon: <LogoutOutlined /> },
        { label: 'Đăng nhập', path: '/login', icon: <LoginOutlined /> },
    ]

    const afLoginLinks = [
        { label: 'Trang chủ', path: '/', icon: <HomeIcon /> },
        { label: 'Tạo Blog', path: '/create_blog', icon: <CreateIcon /> },
        auth?.user?.role === 'admin' ?
            { label: 'Danh mục', path: '/category', icon: <CreateIcon /> }
            : {},
    ]

    let nameUser: any = auth?.user?.name

    const navLinks = auth.access_token ? afLoginLinks : bfLoginLinks

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <Link to={`/profile/${auth?.user?._id}`} className={classes.account}>Thông tin</Link>
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); dispatch(logout()); }}>
                <Link to="/logout" className={classes.account}>Đăng xuất</Link>
            </MenuItem>
        </Menu >
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        auth.access_token ?
            <Menu
                anchorEl={mobileMoreAnchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
            >
                <MenuItem>
                    <IconButton aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <Link style={{ color: '#333', fontWeight: 500 }} to={"/"}>Message</Link>
                </MenuItem>
                <MenuItem>
                    <IconButton aria-label="show 11 new notifications" color="inherit">
                        <Badge badgeContent={11} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Link style={{ color: '#333', fontWeight: 500 }} to={"/"}>Thông báo</Link>
                </MenuItem>
                {navLinks.map((link, index) => (
                    <MenuItem key={index}>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            {link?.icon}
                        </IconButton>
                        <Link style={{ color: '#333', fontWeight: 500 }} to={link?.path!}>{link?.label}</Link>
                    </MenuItem>
                ))}
                <MenuItem onClick={handleMenuClose}>
                    <Link to="/profile" style={{ color: '#333', fontWeight: 500 }} className={classes.account}>Thông tin</Link>
                </MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); dispatch(logout()); }}>
                    <Link to="/logout" style={{ color: '#333', fontWeight: 500 }} className={classes.account}>Đăng xuất</Link>
                </MenuItem>
            </Menu>
            :
            <Menu
                anchorEl={mobileMoreAnchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
            >
                {navLinks.map((link, index) => (
                    <MenuItem key={index}>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            {link?.icon}
                        </IconButton>
                        <Link style={{ color: '#333', fontWeight: 500 }} to={link?.path!}>{link?.label}</Link>
                    </MenuItem>
                ))}
            </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography className={classes.titleHeader} variant="h6" noWrap>
                        <Link className={` ${classes.loginHeader}`} to="/">Blog Application</Link>
                    </Typography>
                    <Search classes={classes} />
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {auth?.access_token
                            &&
                            (
                                <React.Fragment>
                                    <IconButton aria-label="show 4 new mails" color="inherit">
                                        <Badge badgeContent={4} color="secondary">
                                            <MailIcon />
                                        </Badge>
                                    </IconButton>
                                    <IconButton aria-label="show 17 new notifications" color="inherit">
                                        <Badge badgeContent={17} color="secondary">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton>
                                </React.Fragment>
                            )
                        }
                        <Typography className={`${classes.titleHeader} ${classes.titleLogin}`} variant="h6" noWrap>
                            {
                                navLinks.map((link, index) => (
                                    <Link className={classes.loginHeader} key={index} to={link?.path!}>{link.label}</Link>
                                ))
                            }
                        </Typography>
                        {nameUser &&
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                                style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}
                            >
                                {/* <AccountCircle /> */}
                                <Avatar src={auth.user?.avatar} alt="avatar" />
                                <Typography
                                    className={`${classes.titleHeader} ${classes.titleLogin}`}
                                    variant="h6"
                                    noWrap
                                    style={{ color: 'white', fontSize: '1rem', paddingLeft: '2px', paddingTop: '2.5px' }}
                                >
                                    {` ${nameUser}`}
                                </Typography>
                            </IconButton>
                        }

                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {auth?.access_token && renderMenu}
        </div >
    );
}