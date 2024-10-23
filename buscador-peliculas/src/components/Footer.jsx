import { LogoMovie } from "./LogoMovie"


export function Footer (){
    return (
        <div className="footer-container">
            <p><strong>Credits:</strong> This product uses the TMDB API but is not endorsed or 
                certified by TMDB.</p>
            <LogoMovie />

        </div>
    )
}