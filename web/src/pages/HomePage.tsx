import React from "react";
import { Link } from "react-router-dom";
import { getPublicAssetPath } from "../utils/getPublicAssetPath";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-body">
          <div className="container is-max-desktop">
            <div className="columns is-centered">
              <div className="column has-text-centered">
                <h1 className="title is-1 publication-title">
                  3DReflecNet: A Million-Scale Hybrid Dataset for 3D
                  Reconstruction of Reflective, Transparent, and Textureless
                  Objects
                </h1>
                <div className="is-size-5 publication-authors">
                  <span className="author-block">Anonymous Author</span>
                </div>
                <div className="column has-text-centered">
                  <div className="publication-links">
                    {/* Paper */}
                    <span className="link-block">
                      <a
                        href="https://arxiv.org/pdf/<ARXIV PAPER ID>.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="external-link button is-normal is-rounded is-dark"
                      >
                        <span className="icon">
                          <i className="fas fa-file-pdf"></i>
                        </span>
                        <span>Paper</span>
                      </a>
                    </span>

                    {/* Supplementary PDF */}
                    <span className="link-block">
                      <a
                        href={getPublicAssetPath("static/pdfs/supplementary_material.pdf")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="external-link button is-normal is-rounded is-dark"
                      >
                        <span className="icon">
                          <i className="fas fa-file-pdf"></i>
                        </span>
                        <span>Supplementary</span>
                      </a>
                    </span>

                    {/* Github */}
                    <span className="link-block">
                      <a
                        href="https://github.com/YOUR REPO HERE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="external-link button is-normal is-rounded is-dark"
                      >
                        <span className="icon">
                          <i className="fab fa-github"></i>
                        </span>
                        <span>Code(Coming Soon)</span>
                      </a>
                    </span>

                    {/* Dataset */}
                    <span className="link-block">
                      <a
                        href="https://drive.google.com/drive/folders/1AHyTFkta_bLA2iayU7R8MhaD_KRJAh_Q?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="external-link button is-normal is-rounded is-dark"
                      >
                        <span className="icon">
                          <i className="ai ai-arxiv"></i>
                        </span>
                        <span>Dataset</span>
                      </a>
                    </span>

                    {/* Interactive Demo */}
                    <span className="link-block">
                      <Link
                        to="/instances"
                        className="external-link button is-normal is-rounded is-dark"
                      >
                        <span className="icon">
                          <i className="fas fa-desktop"></i>
                        </span>
                        <span>Interactive Demo</span>
                      </Link>
                    </span>
                  </div>
                </div>

                {/* Teaser Image */}
                <div className="container is-max-desktop" style={{ marginTop: "3em" }}>
                  <img
                    src={getPublicAssetPath("static/images/teaser.png")}
                    alt="Teaser Image"
                    style={{ width: "100%", height: "auto" }}
                  />
                  <h2 className="subtitle has-text-centered" style={{ marginTop: "1em" }}>
                    3D ReflectNet: A large-scale multi-view, object-centric dataset
                    featuring reflective, transparent, and textureless objects.
                    Providing high-quality annotations for 3D reconstruction.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Abstract */}
      <section className="section hero is-light">
        <div className="container is-max-desktop">
          <div className="columns is-centered has-text-centered">
            <div className="column is-four-fifths">
              <h2 className="title is-3">Abstract</h2>
              <div className="content has-text-justified">
                <p>
                  Accurate 3D reconstruction of objects with reflective,
                  transparent, or textureless surfaces remains a significant
                  challenge. Such materials often violate key assumptions in
                  multi-view reconstruction pipelines, such as photometric
                  consistency and the reliance on distinct geometric texture
                  cues. Existing datasets primarily focus on diffuse, textured
                  objects, thereby offering limited insight into performance
                  under real-world material complexities. In this paper, we
                  introduce <strong>3DReflecNet</strong>, a million-scale hybrid
                  dataset specifically designed to benchmark and advance 3D
                  reconstruction methods for these challenging materials.
                  3DReflecNet combines over 100,000 synthetic instances
                  generated via physically-based rendering with more than 1,000
                  real-world scanned objects captured using consumer RGB-D
                  devices. It encompasses diverse materials, complex lighting
                  conditions, and a wide range of geometric forms—including
                  shapes generated from both real and LLM-synthesized 2D images
                  using diffusion-based methods. To support robust evaluation,
                  we design benchmarks for five core tasks:
                  structure-from-motion, novel view synthesis, reflection
                  removal, image matching, and object relighting. Through
                  extensive experiments, we show that state-of-the-art methods
                  struggle to maintain accuracy across these settings,
                  highlighting the need for more resilient 3D vision models. We
                  release the dataset, baselines, and evaluation suite to
                  facilitate progress in this direction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="section">
        <div className="container is-max-desktop">
          <div className="columns is-centered">
            <div className="column">
              <h2 className="title is-3 has-text-centered">
                Comparison with Related Dataset
              </h2>
              <div style={{ margin: "2em auto", textAlign: "center" }}>
                <div>
                  <img
                    src={getPublicAssetPath("static/images/comparison.png")}
                    alt="Comparison and statistics overview"
                    style={{
                      width: "100%",
                      maxWidth: "800px",
                      height: "auto",
                      margin: "auto",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "1.2em",
                      color: "#666",
                      marginTop: "0.5em",
                    }}
                  >
                    Figure 3: Comparison between other related datasets. The
                    symbol "#" denotes the total count, "PBR" refers to
                    physically-based rendering, and "w/ Real" indicates the
                    inclusion of real-world data.
                  </p>
                </div>

                <div style={{ marginTop: "3em" }}>
                  <img
                    src={getPublicAssetPath("static/images/statistics.png")}
                    alt="Summary statistics of the 3DReflecNet dataset"
                    style={{
                      width: "100%",
                      maxWidth: "800px",
                      height: "auto",
                      margin: "auto",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "1.2em",
                      color: "#666",
                      marginTop: "0.5em",
                    }}
                  >
                    Figure 4: Summary statistics of the 3DReflecNet dataset.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dataset Overview */}
      <section className="section hero is-light">
        <div className="container is-max-desktop">
          <div className="columns is-centered">
            <div className="column">
              <h2 className="title is-3 has-text-centered">Dataset Overview</h2>

              <div
                className="content has-text-centered"
                style={{ marginBottom: "2em" }}
              >
                <p style={{ fontSize: "1.1em" }}>
                  For material details, please refer to our{" "}
                  <a
                    href={getPublicAssetPath("static/pdfs/material.pdf")}
                    style={{ color: "#3273dc" }}
                  >
                    material specifications
                  </a>{" "}
                  📄
                </p>
                <p style={{ fontSize: "1.1em" }}>
                  You can download the{" "}
                  <code
                    style={{
                      backgroundColor: "#f1f1f1",
                      padding: "0.2em 0.4em",
                      margin: 0,
                      fontSize: "95%",
                      borderRadius: "6px",
                      color: "#e83e8c",
                    }}
                  >
                    .blend
                  </code>{" "}
                  file containing all materials{" "}
                  <a
                    href="https://gofile.me/7IL4k/ORMCynUxL"
                    style={{ color: "#3273dc" }}
                  >
                    here
                  </a>{" "}
                  📦
                </p>
              </div>

              <div style={{ margin: "2em auto", textAlign: "center" }}>
                <div>
                  <img
                    src={getPublicAssetPath("static/images/Overview.png")}
                    alt="Comparison and statistics overview"
                    style={{
                      width: "100%",
                      maxWidth: "800px",
                      height: "auto",
                      margin: "auto",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "1.2em",
                      color: "#666",
                      marginTop: "0.5em",
                    }}
                  >
                    Synthesis Dataset: Qualitative examples of the object with
                    various materials with Lighting dataset.
                  </p>
                </div>
              </div>

              <div style={{ margin: "2em auto", textAlign: "center" }}>
                <div>
                  <img
                    src={getPublicAssetPath("static/images/gold-colmap.png")}
                    alt="Summary statistics of the 3DReflecNet dataset."
                    style={{
                      width: "100%",
                      maxWidth: "800px",
                      height: "auto",
                      margin: "auto",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "1.2em",
                      color: "#666",
                      marginTop: "0.5em",
                    }}
                  >
                    Real Dataset: Qualitative examples for Capturing Reflective
                    Objects using Rotating platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benchmark Result */}
      <section className="section">
        <div className="container is-max-desktop">
          <div className="columns is-centered">
            <div className="column">
              <h2 className="title is-3 has-text-centered">Benchmark Result</h2>

              <div style={{ margin: "2em auto", textAlign: "center" }}>
                <div>
                  <img
                    src={getPublicAssetPath("static/images/Image Matching.png")}
                    alt="Benchmark Image Matching Performance"
                    style={{
                      width: "100%",
                      maxWidth: "800px",
                      height: "auto",
                      margin: "auto",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "1.2em",
                      color: "#666",
                      marginTop: "0.5em",
                    }}
                  >
                    Benchmark Image Matching Performance on the 3DReflecNet
                    dataset. The italics letter represent the result for
                    MegaDepth dataset
                  </p>
                </div>
              </div>

              <div style={{ margin: "2em auto", textAlign: "center" }}>
                <div>
                  <img
                    src={getPublicAssetPath("static/images/Camera_Pose_Estimation.png")}
                    alt="Camera Pose Estimation"
                    style={{
                      width: "100%",
                      maxWidth: "800px",
                      height: "auto",
                      margin: "auto",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "1.2em",
                      color: "#666",
                      marginTop: "0.5em",
                    }}
                  >
                    Camera Pose Estimation
                  </p>
                </div>
              </div>

              <div style={{ margin: "2em auto", textAlign: "center" }}>
                <div>
                  <img
                    src={getPublicAssetPath("static/images/NVS.png")}
                    alt="Novel View Synthesis"
                    style={{
                      width: "100%",
                      maxWidth: "800px",
                      height: "auto",
                      margin: "auto",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "1.2em",
                      color: "#666",
                      marginTop: "0.5em",
                    }}
                  >
                    Qualitative results of 2DGS surface reconstruction fidelity
                    across various materials. (b)Qualitative results of 3DGS
                    novel view synthesis visual quality.
                  </p>
                </div>
              </div>

              <div style={{ margin: "2em auto", textAlign: "center" }}>
                <div>
                  <img
                    src={getPublicAssetPath("static/images/surface-recon.png")}
                    alt="Surface Reconstruction Performance"
                    style={{
                      width: "100%",
                      maxWidth: "800px",
                      height: "auto",
                      margin: "auto",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "1.2em",
                      color: "#666",
                      marginTop: "0.5em",
                    }}
                  >
                    Benchmark Surface Reconstruction Performance on the
                    3DReflecNet dataset. The metric is Chamfer Distance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-8">
              <div className="content">
                <p>
                  This page was built using the{" "}
                  <a
                    href="https://github.com/eliahuhorwitz/Academic-project-page-template"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Academic Project Page Template
                  </a>{" "}
                  which was adopted from the{" "}
                  <a
                    href="https://nerfies.github.io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Nerfies
                  </a>{" "}
                  project page. You are free to borrow the source code of this
                  website, we just ask that you link back to this page in the
                  footer. <br /> This website is licensed under a{" "}
                  <a
                    rel="license"
                    href="http://creativecommons.org/licenses/by-sa/4.0/"
                    target="_blank"
                  >
                    Creative Commons Attribution-ShareAlike 4.0 International
                    License
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
