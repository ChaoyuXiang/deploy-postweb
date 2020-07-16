import React from 'react';
import github from '../image/github.png';
import linkedin from '../image/linkedin.png';
import fb from '../image/facebook.png';
import ins from '../image/ins.png';

class Footer extends React.Component {
    render() {
        return (
            <footer className ="about-me">
                <ul>
                    <li>
                        <a href="https://github.com/ChaoyuXiang" target="_blank"><img src={github} alt="github Logo" className="gh-icon">
                        </img>

                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/chaoyuxiang/" target="_blank">
                            <img src={linkedin} alt="linkedin Logo" className ="l-icon">
                            </img></a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/chaoyuX" target="_blank">
                            <img src={fb} alt="fb Logo" className ="fb-icon">
                            </img></a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/chaoyu_xiang/" target="_blank">
                            <img src={ins} alt="ins Logo" className ="ins-icon">
                            </img></a>
                    </li>
                </ul>
            </footer>
        )
    }
}

export default Footer;