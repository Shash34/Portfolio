import './Certificates.css';
import Navbar from './NavBar';
import { useState } from 'react';
import BDAA from './images/BDAA.jpg';
import FreeCodeCamp from './images/Freecodecamp.png';
import { FaFreeCodeCamp } from 'react-icons/fa';

function Certificates() {
  const certificates = [
    {
      title: "CompTIA Security+",
      tags: ["comptia", "security+", "certification"]
    },
    {
      title: "CompTIA Network+",
      tags: ["comptia", "network+", "certification"]
    },
    {
      title: "CompTIA PenTest+",
      tags: ["comptia", "network+", "certification"]
    },
    {
      title: "BDAA 1st Place Certificate",
      tags: ["BDAA", "Big Data Analytics Association", "club", "1st", "first"],
      image: BDAA,
      zoomStyle: "translateX(500px) translateY(-150px) scale(4)"
    },
    {
      title: "FreeCodeCamp Certificate",
      tags: ["freecodecamp", "ai", "machine learning"],
      image: FreeCodeCamp,
      zoomStyle: "translateY(-150px) scale(4)"

    },
    {
      title: "CodePath Cybersecurity",
      tags: ["codepath", "cybersecurity", "bootcamp"]
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [zoomedTitle, setZoomedTitle] = useState(null);

  const lowercasedSearch = searchTerm.toLowerCase();
  const filteredCertificates = certificates.filter((cert) =>
    cert.title.toLowerCase().includes(lowercasedSearch) ||
    cert.tags.some((tag) => tag.toLowerCase().includes(lowercasedSearch))
  );

  const filterByTag = (tag) =>
    filteredCertificates.filter((cert) =>
      cert.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    );

  return (
    <>
      <Navbar />

      <div className="overall-container">
        <div className="title">
          <h1>Certificates Dashboard</h1>
        </div>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search certificates:"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="cert-section" id="comptia">
        <h2>CompTIA</h2>
        <div className="certificate-grid">
          {filterByTag("comptia").map((cert) => (
            <div
              key={cert.title}
              className={`certificate-card ${zoomedTitle === cert.title ? 'zoomed-card' : ''}`}
            >
              <p className="certificate-title">{cert.title}</p>
              {cert.image && (
                <img
                  src={cert.image}
                  alt={cert.title}
                  className={zoomedTitle === cert.title ? 'zoomed' : ''}
                  onClick={() =>
                    setZoomedTitle(zoomedTitle === cert.title ? null : cert.title)
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="cert-section" id="awards">
        <h2>Red-Teaming</h2>
        <div className="certificate-grid">
          {filterByTag("red-teaming").map((cert) => (
            <div
              key={cert.title}
              className={`certificate-card ${zoomedTitle === cert.title ? 'zoomed-card' : ''}`}
            >
              <p className="certificate-title">{cert.title}</p>
              {cert.image && (
                <img
                  src={cert.image}
                  alt={cert.title}
                  className={zoomedTitle === cert.title ? 'zoomed' : ''}
                  onClick={() =>
                    setZoomedTitle(zoomedTitle === cert.title ? null : cert.title)
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="cert-section" id="extras">
        <h2>Other (Clubs / External)</h2>
        <div className="certificate-grid">
          {filteredCertificates
            .filter((cert) =>
              cert.tags.some((tag) =>
                ["freecodecamp", "codepath", "bdaa"].includes(tag.toLowerCase())
              )
            )
            .map((cert) => (
              <div
                key={cert.title}
                className={`certificate-card ${zoomedTitle === cert.title ? 'zoomed-card' : ''}`}
              >
                <p className="certificate-title">{cert.title}</p>
                {cert.image && (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className={zoomedTitle === cert.title ? 'zoomed' : ''}
                    style={zoomedTitle === cert.title ? { transform: cert.zoomStyle } : {}}
                    onClick={() =>
                      setZoomedTitle(zoomedTitle === cert.title ? null : cert.title)
                    }
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Certificates;
