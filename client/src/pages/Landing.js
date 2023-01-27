
import { Link } from 'react-router-dom';
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/Testing'
import { Logo } from '../components';

const Landing = ()=> {
    return(
        <Wrapper>
            <nav>
                <Logo/>
            </nav>
            <div className='container page'>
                <div className='info'>
                    <h1> Job <span> Tracking </span> app</h1>
                    <p>
                        Contrary to popular belief, Lorem Ipsum is not 
                        simply random text. It has roots in a piece of classical Latin
                        literature from 45 BC, making it over 2000 years old. Richard McClintock, 
                        a Latin professor at Hampden-Sydney College in Virginia
                    </p>
                    <Link to='/register' className='btn btn-hero'> Login/Register </Link>
                </div>
                <img src={main} alt='job hunt' className='img main-img'/>
            </div>
            
        </Wrapper>
    )
}

export default Landing; 