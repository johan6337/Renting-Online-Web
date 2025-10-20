import Header from '../components/header/Header';

const CartPage = ({ onBack, onLoginClick, onSignUpClick, onForgotPasswordClick, onProfileClick, onAdminClick, onCartClick}) => {

    return (
        <div>
            <Header onLoginClick={onLoginClick} onSignUpClick={onSignUpClick} onProfileClick={onProfileClick} onAdminClick={onAdminClick} onCartClick={onCartClick}/>
            
        </div>
    )
}

export default CartPage;