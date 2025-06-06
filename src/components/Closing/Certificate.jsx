import React, { useRef, useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Confetti from 'react-confetti';
import stampImage from '@/assets/imgs/stamp.png';
import '@/css/Certificate.css';

const Certificate = ({ name, department, score }) => {
    const certRef = useRef();
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const downloadPDF = async () => {
        const canvas = await html2canvas(certRef.current);
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('landscape', 'pt', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save('SafetySagaCertificate.pdf');
    };

    return (
        <div className="certificate-wrapper">
            <Confetti
                width={windowSize.width}
                height={windowSize.height}
                numberOfPieces={100}
                gravity={0.2}
                recycle={true}
            />

            <div className="certificate" ref={certRef}>
                <div className="cert-border">
                    <h1 className="cert-title">Certificate of Completion</h1>
                    <p className="cert-subtitle">This certifies that</p>
                    <h2 className="cert-name">{name}</h2>
                    <p className="cert-body">
                        from the <strong>{department}</strong> department has successfully completed <br />
                        <strong><em>The Safety Saga: Escape Edition Health & Safety Challenge.</em></strong>
                    </p>
                    <p className="cert-details">
                        <strong>Final Score:</strong> {score} <br />
                    </p>
                    <p className="cert-footer">Issued by: ICT Department</p>
                    <img src={stampImage} alt="Official Stamp" className="stamp" />
                </div>
            </div>

            <button className="download-btn" onClick={downloadPDF}>
                ⬇ Download Certificate
            </button>
        </div>
    );
};

export default Certificate;
