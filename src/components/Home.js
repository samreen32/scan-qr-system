import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            <div className="body-wrap">
                <main>
                    <section className="hero">
                        <div className="container">
                            <div className="hero-inner">
                                <div className="hero-copy">
                                    <h1 className="hero-title mt-0">Scan QR/Bar Codes and <br/>Generate Reports</h1>
                                    <p className="hero-paragraph">
                                        Our application makes it easy to scan QR and bar codes and instantly generate detailed reports about your items, helping you keep track of inventory and much more.
                                    </p>
                                    <div className="hero-cta mt-5 d-flex">
                                        <div className="dropdown">
                                            <button
                                                className="button btn btn-primary dropdown-toggle mr-2 same-size"
                                                type="button"
                                                id="dropdownStartGenerate"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                Start and Generate
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownStartGenerate">
                                                <Link className="dropdown-item" to="/ScanBarCode">Scan Bar Code</Link>
                                                <Link className="dropdown-item" to="/ScanQRCode">Scan QR Code</Link>
                                                <Link className="dropdown-item" to="/GenerateReport">Enter Details</Link>
                                            </div>
                                        </div>
                                        <div className="dropdown">
                                            <button
                                                className="button btn btn-primary dropdown-toggle mr-2 same-size"
                                                type="button"
                                                id="dropdownMenuButton"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                More Features
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <Link className="dropdown-item" to="/SalesReport">Sales Report</Link>
                                                <Link className="dropdown-item" to="/PerItemReport">Per Item Report</Link>
                                                <Link className="dropdown-item" to="/ClientsReport">Client Record</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="hero-figure anime-element">
                                    <svg className="placeholder" width="528" height="396" viewBox="0 0 528 396">
                                        <rect width="528" height="396" style={{ fill: 'transparent' }} />
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
