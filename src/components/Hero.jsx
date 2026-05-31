import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
    const videoRef = useRef(null);
    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        const heroSplit = new SplitText('.title', { type: "chars,words" });
        const paragraphSplit = new SplitText('.subtitle', { type: "lines" });

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.05,
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
            delay: 1,
        });

        const startValue = "top top";
        const endValue   = "bottom top";

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'video',
                start: startValue,
                end: endValue,
                scrub: 0.05,
                pin: true,
            }
        });

        videoRef.current.onloadedmetadata = () => {
            tl.to(videoRef.current, {
                currentTime: videoRef.current.duration,
            });
        };

    }, []);

    return (
        <>
            <section id='hero' className='backgrond-principal'>
               {/*} <h1 className='title'>Nutricionista</h1>

                <div className="body">
                    <div className="content">
                        <div className="space">
                            <p>Introdução</p>
                            <p className="subtitle">
                                subtitulo do site
                            </p>
                        </div>
                        <div className="view-plate">
                            <p className="subtitle">
                                a base para se ter resultados é uma alimentação saudável..
                                <a href="#contact" className="btn">Agende uma consulta</a>
                            </p>
                        </div>
                    </div>
                </div>*/}
            </section>

            <div className="video-brackground">
                <video
                    ref={videoRef}
                    src="videos/video-scrub.mp4"
                    playsInline
                    preload="auto"
                    muted
                />
            </div>
        </>
    );
}

export default Hero;
