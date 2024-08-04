import React from 'react';

function Home() {
    return (
        <>
            <div className="body-wrap">
                <main>
                    <section className="hero">
                        <div className="container">
                            <div className="hero-inner">
                                <div className="hero-copy">
                                    <h1 className="hero-title mt-0">Scan QR/Bar Codes and Generate Reports</h1>
                                    <p className="hero-paragraph">Our application makes it easy to scan QR and bar codes and instantly generate detailed reports about your items, helping you keep track of inventory and much more.</p>
                                    <div className="hero-cta mt-5">
                                        <a className="button" href="#">Start Without Bar Code</a>
                                        <a className="button" href="#">Start With Bar Code</a>
                                    </div>
                                </div>
                                <div className="hero-figure anime-element">
                                    <svg className="placeholder" width="528" height="396" viewBox="0 0 528 396">
                                        <rect width="528" height="396" style={{ fill: "transparent" }} />
                                    </svg>
                                    <div className="hero-figure-box hero-figure-box-01" data-rotation="45deg"></div>
                                    <div className="hero-figure-box hero-figure-box-02" data-rotation="-45deg"></div>
                                    <div className="hero-figure-box hero-figure-box-03" data-rotation="0deg"></div>
                                    <div className="hero-figure-box hero-figure-box-04" data-rotation="-135deg"></div>
                                    <div className="hero-figure-box hero-figure-box-05"></div>
                                    <div className="hero-figure-box hero-figure-box-06"></div>
                                    <div className="hero-figure-box hero-figure-box-07"></div>
                                    <div className="hero-figure-box hero-figure-box-08" data-rotation="-22deg"></div>
                                    <div className="hero-figure-box hero-figure-box-09" data-rotation="-52deg"></div>
                                    <div className="hero-figure-box hero-figure-box-10" data-rotation="-50deg"></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}

export default Home;
