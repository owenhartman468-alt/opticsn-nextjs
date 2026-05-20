"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function Home() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    address: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Scroll reveal and navbar logic
  useEffect(() => {
    // Navbar scrolled shadow class
    const handleScroll = () => {
      const nav = document.getElementById("mainNav");
      if (nav) {
        nav.classList.toggle("scrolled", window.scrollY > 40);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Scroll reveal animation
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));

    // Animated counters
    const animateCount = (el, target, suffix) => {
      let start = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        start += step;
        if (start >= target) {
          el.textContent = target + suffix;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(start) + suffix;
        }
      }, 20);
    };

    const statObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const nums = e.target.querySelectorAll(".stat-number");
            nums.forEach((n) => {
              const txt = n.textContent;
              if (txt.includes("+")) animateCount(n, parseInt(txt), "+");
              else if (txt.includes("%")) animateCount(n, parseInt(txt), "%");
              else if (txt.includes("★")) animateCount(n, parseInt(txt), "★");
            });
            statObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll(".stats-bar").forEach((el) => statObs.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      statObs.disconnect();
    };
  }, []);

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Simple validation
    if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.address) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Name: formData.name,
          Phone: formData.phone,
          Service: formData.service,
          Preferred_Date: formData.date,
          Address: formData.address,
          Notes: formData.notes,
          _subject: `New Optics-N Appointment Request from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (response.ok && (result.success === true || result.success === "true")) {
        setSubmitted(true);
        // Clear form
        setFormData({
          name: "",
          phone: "",
          service: "",
          date: "",
          address: "",
          notes: "",
        });
      } else {
        setError(result.message || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while sending your request. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setError(null);
  };

  return (
    <>
      {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
      <nav className="navbar navbar-expand-lg" id="mainNav">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/images/logo.png" className="header-logo" alt="Optics-N Logo" />
          </a>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list fs-4" style={{ color: "var(--teal)" }}></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
              <li className="nav-item">
                <a className="nav-link" href="#why-us">Why Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#how-it-works">How It Works</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#testimonials">Reviews</a>
              </li>
              <li className="nav-item ms-lg-2">
                <a className="nav-link btn-nav" href="#contact">Book Appointment</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="hero" id="home">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="hero-badge">
                <i className="bi bi-house-heart me-1"></i> Home Visit Eye Care
              </div>
              <h1>
                Professional Eye Care<br />
                <em>Right at Your Doorstep</em>
              </h1>
              <p className="hero-desc">
                Because your parents deserve comfort, and your child deserves patience — we bring gentle, expert
                eye care right to your home. No travel, no stress. Just loving professional checkups where you
                feel safest.
              </p>
              <div className="hero-actions d-flex flex-wrap gap-2">
                <a href="#contact" className="btn-primary-main">Book a Home Visit</a>
                <a
                  href="https://wa.me/923032632565"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-main"
                >
                  <i className="bi bi-whatsapp me-1"></i> WhatsApp Us
                </a>
              </div>
            </div>

            <div className="col-lg-6 d-flex justify-content-center justify-content-lg-end">
              <div className="hero-image-wrap position-relative">
                <img src="/images/banner-image.jpg" alt="Doctor doing eye checkup at home" className="main-img" />
                {/* floating cards */}
                <div className="floating-card card-1">
                  <span className="icon"><i className="bi bi-house-check"></i></span>
                  <span>Home Visits Available</span>
                </div>
                <div className="floating-card card-2">
                  <span className="icon"><i className="bi bi-shield-check"></i></span>
                  <span>Certified Eye Specialists</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────────────────── */}
      <div className="stats-bar">
        <div className="container">
          <div className="row g-4 justify-content-center text-center">
            <div className="col-6 col-md-3 stat-item reveal">
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Families</div>
            </div>
            <div className="col-6 col-md-3 stat-item reveal reveal-delay-1">
              <div className="stat-number">5★</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="col-6 col-md-3 stat-item reveal reveal-delay-2">
              <div className="stat-number">100%</div>
              <div className="stat-label">Home Service</div>
            </div>
            <div className="col-6 col-md-3 stat-item reveal reveal-delay-3">
              <div className="stat-number">24hr</div>
              <div className="stat-label">Response Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── WHY US ──────────────────────────────────────────────────────── */}
      <section className="why-us" id="why-us">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-7 text-center reveal">
              <div className="section-label">Why Choose Us</div>
              <h2 className="section-title">Eye Care That Comes<br /><em>With a Personal Touch</em></h2>
              <p className="section-sub mx-auto">
                We understand that mobility challenges and busy schedules make clinic visits hard. Our specialists come to you — equipped, compassionate, and caring.
              </p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3 reveal">
              <div className="why-card">
                <div className="why-icon"><i className="bi bi-house-door"></i></div>
                <h4>Doorstep Service</h4>
                <p>Full eye examinations performed at your home — no commute, no waiting rooms, no hassle for your family.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 reveal reveal-delay-1">
              <div className="why-card">
                <div className="why-icon"><i className="bi bi-person-hearts"></i></div>
                <h4>Family Focused</h4>
                <p>From elderly grandparents to young children, our gentle approach is tailored for every age and need.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 reveal reveal-delay-2">
              <div className="why-card">
                <div className="why-icon"><i className="bi bi-award"></i></div>
                <h4>Certified Specialists</h4>
                <p>Our optometrists are fully certified and bring professional-grade diagnostic equipment to your door.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 reveal reveal-delay-3">
              <div className="why-card">
                <div className="why-icon"><i className="bi bi-chat-heart"></i></div>
                <h4>Caring Support</h4>
                <p>We follow up after every visit and are always reachable via phone or WhatsApp for your peace of mind.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────── */}
      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-7 text-center reveal">
              <div className="section-label">Simple Process</div>
              <h2 className="section-title">Eye Care in<br /><em>Three Easy Steps</em></h2>
            </div>
          </div>
          <div className="row g-4 justify-content-center position-relative">
            <div className="col-md-4 reveal">
              <div className="step-card">
                <div className="step-number">01</div>
                <div className="step-circle"><i className="bi bi-telephone"></i></div>
                <h4>Book an Appointment</h4>
                <p>Call or WhatsApp us on <strong>0303-2632565</strong>. Tell us your location and preferred time — we'll confirm within hours.</p>
              </div>
            </div>
            <div className="col-md-4 reveal reveal-delay-1">
              <div className="step-card">
                <div className="step-number">02</div>
                <div className="step-circle"><i className="bi bi-house-check"></i></div>
                <h4>We Visit Your Home</h4>
                <p>Our specialist arrives at your doorstep with all equipment. Comfortable, private, and completely stress-free for your family.</p>
              </div>
            </div>
            <div className="col-md-4 reveal reveal-delay-2">
              <div className="step-card">
                <div className="step-number">03</div>
                <div className="step-circle"><i className="bi bi-eye"></i></div>
                <h4>Get Your Prescription</h4>
                <p>Receive a detailed eye report, prescription, and personalised advice — all from the comfort of your own home.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────────── */}
      <section className="services" id="services">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-7 text-center reveal">
              <div className="section-label">What We Offer</div>
              <h2 className="section-title">Our <em>Eye Care</em> Services</h2>
              <p className="section-sub mx-auto">
                Comprehensive services delivered with care — designed for seniors, children, and everyone who deserves better access to quality eye health.
              </p>
            </div>
          </div>

          {/* Premium swiper for Services */}
          <div className="reveal">
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true, el: ".swiper-custom-pagination" }}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 3,
                },
              }}
              className="services-swiper"
            >
              <SwiperSlide className="h-auto">
                <div className="service-card h-100 d-flex flex-column">
                  <div className="service-img-wrap">
                    <img src="/images/ser-1.jpg" alt="Complete Eye Examination" />
                  </div>
                  <div className="service-body flex-grow-1 d-flex flex-column justify-content-between">
                    <div>
                      <div className="service-tag">Core Service</div>
                      <h4>Complete Eye Examination</h4>
                      <p>Comprehensive vision testing, refraction, and retinal health assessment — all at your home with clinical-grade tools.</p>
                    </div>
                    <a href="#contact" className="service-link mt-3">Book Now <i className="bi bi-arrow-right"></i></a>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="h-auto">
                <div className="service-card h-100 d-flex flex-column">
                  <div className="service-img-wrap">
                    <img src="/images/ser-2.jpg" alt="Elderly Eye Care" />
                  </div>
                  <div className="service-body flex-grow-1 d-flex flex-column justify-content-between">
                    <div>
                      <div className="service-tag">Senior Care</div>
                      <h4>Elderly Eye Care</h4>
                      <p>Specialised care for parents and grandparents with mobility concerns — gentle, patient, and respectful of their comfort.</p>
                    </div>
                    <a href="#contact" className="service-link mt-3">Book Now <i className="bi bi-arrow-right"></i></a>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="h-auto">
                <div className="service-card h-100 d-flex flex-column">
                  <div className="service-img-wrap">
                    <img src="/images/ser-3.jpg" alt="Children's Vision Screening" />
                  </div>
                  <div className="service-body flex-grow-1 d-flex flex-column justify-content-between">
                    <div>
                      <div className="service-tag">Paediatric</div>
                      <h4>Children's Vision Screening</h4>
                      <p>Early detection of vision issues in children with a playful, patient approach that puts kids at ease.</p>
                    </div>
                    <a href="#contact" className="service-link mt-3">Book Now <i className="bi bi-arrow-right"></i></a>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="h-auto">
                <div className="service-card h-100 d-flex flex-column">
                  <div className="service-img-wrap">
                    <img src="/images/ser-4.jpg" alt="Glasses Prescription" />
                  </div>
                  <div className="service-body flex-grow-1 d-flex flex-column justify-content-between">
                    <div>
                      <div className="service-tag">Prescriptions</div>
                      <h4>Glasses Prescription</h4>
                      <p>Accurate prescription testing for reading, distance, and bifocal lenses, with guidance on frame selection.</p>
                    </div>
                    <a href="#contact" className="service-link mt-3">Book Now <i className="bi bi-arrow-right"></i></a>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="h-auto">
                <div className="service-card h-100 d-flex flex-column">
                  <div className="service-img-wrap">
                    <img src="/images/ser-5.jpg" alt="Special Children Eye Care" />
                  </div>
                  <div className="service-body flex-grow-1 d-flex flex-column justify-content-between">
                    <div>
                      <div className="service-tag">Special</div>
                      <h4>Special Children Eye Care</h4>
                      <p>Regular follow-up visits to track progress, update prescriptions, and ensure long-term eye health for the whole family.</p>
                    </div>
                    <a href="#contact" className="service-link mt-3">Book Now <i className="bi bi-arrow-right"></i></a>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="h-auto">
                <div className="service-card h-100 d-flex flex-column">
                  <div className="service-img-wrap">
                    <img src="/images/ser-6.jpg" alt="Eye Health Consultation" />
                  </div>
                  <div className="service-body flex-grow-1 d-flex flex-column justify-content-between">
                    <div>
                      <div className="service-tag">Advisory</div>
                      <h4>Eye Health Consultation</h4>
                      <p>One-on-one consultations to address concerns about eye conditions, screen time, and preventative care strategies.</p>
                    </div>
                    <a href="#contact" className="service-link mt-3">Book Now <i className="bi bi-arrow-right"></i></a>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>

            {/* Custom slider controls */}
            <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
              <button className="swiper-button-prev-custom swiper-nav-btn" aria-label="Previous service slide">
                <i className="bi bi-arrow-left"></i>
              </button>
              <div className="swiper-custom-pagination"></div>
              <button className="swiper-button-next-custom swiper-nav-btn" aria-label="Next service slide">
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────── */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-7 text-center reveal">
              <div className="section-label">What Families Say</div>
              <h2 className="section-title" style={{ color: "#fff" }}>
                Trusted by <em style={{ color: "var(--sand)" }}>Families</em> Across the City
              </h2>
            </div>
          </div>

          {/* Swiper for Testimonials */}
          <div className="reveal">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              pagination={{ clickable: true, el: ".swiper-testi-pagination" }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 3,
                },
              }}
              className="testimonials-swiper"
            >
              <SwiperSlide className="h-auto">
                <div className="testi-card h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="testi-stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <p>
                      "My father is 80 and can't travel easily. Optics-N came home and gave him the most thorough eye test he's had in years. Such a kind and professional team."
                    </p>
                  </div>
                  <div className="testi-author mt-3">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                      className="testi-avatar"
                      alt="Ahmed Raza"
                    />
                    <div>
                      <div className="testi-name">Ahmed Raza</div>
                      <div className="testi-role">Son, Karachi</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="h-auto">
                <div className="testi-card h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="testi-stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <p>
                      "My daughter was scared of eye tests, but the specialist was so patient and gentle with her. We got her glasses prescription done without any tears. Highly recommend!"
                    </p>
                  </div>
                  <div className="testi-author mt-3">
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
                      className="testi-avatar"
                      alt="Sana Malik"
                    />
                    <div>
                      <div className="testi-name">Sana Malik</div>
                      <div className="testi-role">Mother, Karachi</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="h-auto">
                <div className="testi-card h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="testi-stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <p>
                      "I was skeptical about home eye care but the equipment and professionalism matched any clinic I've visited. The convenience alone is worth every penny."
                    </p>
                  </div>
                  <div className="testi-author mt-3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
                      className="testi-avatar"
                      alt="Tariq Hussain"
                    />
                    <div>
                      <div className="testi-name">Tariq Hussain</div>
                      <div className="testi-role">Retired Professional, Karachi</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>

            {/* Testimonials bullet pagination */}
            <div className="swiper-testi-pagination mt-3"></div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────── */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-7 text-center reveal">
              <div className="section-label">Get in Touch</div>
              <h2 className="section-title">Book Your <em>Home Visit</em></h2>
              <p className="section-sub mx-auto">
                Ready for stress-free eye care at home? Reach out and we'll confirm your appointment within the day.
              </p>
            </div>
          </div>

          <div className="contact-card reveal">
            <div className="row g-5">
              {/* Contact Info */}
              <div className="col-lg-5">
                <h3 style={{ fontSize: "1.8rem", marginBottom: "1.8rem" }}>
                  We'd Love<br />
                  <em>to Hear From You</em>
                </h3>

                <div className="contact-info-item">
                  <div className="contact-icon-wrap">
                    <i className="bi bi-telephone-fill"></i>
                  </div>
                  <div>
                    <div className="contact-label">Call Us</div>
                    <a href="tel:+923032632565">0303-2632565</a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon-wrap">
                    <i className="bi bi-whatsapp"></i>
                  </div>
                  <div>
                    <div className="contact-label">WhatsApp</div>
                    <a href="https://wa.me/923032632565" target="_blank" rel="noopener noreferrer">
                      0303-2632565
                    </a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon-wrap">
                    <i className="bi bi-geo-alt-fill"></i>
                  </div>
                  <div>
                    <div className="contact-label">Service Area</div>
                    <a href="#">Karachi & Surrounding Areas</a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon-wrap">
                    <i className="bi bi-clock-fill"></i>
                  </div>
                  <div>
                    <div className="contact-label">Available</div>
                    <a href="#">Mon – Sat, 9:00 AM – 7:00 PM</a>
                  </div>
                </div>
              </div>

              {/* Appointment Form */}
              <div className="col-lg-7">
                {submitted ? (
                  <div className="form-success-card">
                    <div className="form-success-icon">
                      <i className="bi bi-check2-circle"></i>
                    </div>
                    <h4>Request Received!</h4>
                    <p>
                      Thank you for booking with Optics-N. We have received your details and our team will contact you shortly at <strong>owenhartman468@gmail.com</strong> or via phone to confirm your preferred slot.
                    </p>
                    <button className="btn-success-reset" onClick={resetForm}>
                      Book Another Visit
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit}>
                    <div className="row g-3">
                      <div className="col-sm-6">
                        <label className="form-label">Your Name <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="e.g. Ali Hassan"
                          required
                        />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label">Phone Number <span className="text-danger">*</span></label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="03XX-XXXXXXX"
                          required
                        />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label">Service Needed <span className="text-danger">*</span></label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="form-select"
                          required
                        >
                          <option value="">Select a service…</option>
                          <option value="Complete Eye Examination">Complete Eye Examination</option>
                          <option value="Elderly Eye Care">Elderly Eye Care</option>
                          <option value="Children's Vision Screening">Children's Vision Screening</option>
                          <option value="Glasses Prescription">Glasses Prescription</option>
                          <option value="Special Children Eye Care">Special Children Eye Care</option>
                          <option value="Eye Health Consultation">Eye Health Consultation</option>
                        </select>
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label">Preferred Date <span className="text-danger">*</span></label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Your Address <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Home address for the visit"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Additional Notes</label>
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          className="form-control"
                          rows="3"
                          placeholder="Any special requirements or concerns…"
                        ></textarea>
                      </div>

                      {error && (
                        <div className="col-12 mt-2">
                          <div className="alert alert-danger py-2 px-3 m-0" role="alert" style={{ borderRadius: "10px", fontSize: "0.9rem" }}>
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            {error}
                          </div>
                        </div>
                      )}

                      <div className="col-12 mt-3">
                        <button type="submit" className="btn-submit" disabled={loading}>
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Confirming...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-calendar-check me-2"></i>Confirm My Appointment
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer>
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4">
              <div className="brand mb-3">
                <img src="/images/footer-logo.png" className="footer-logo" alt="Optics-N Logo" />
              </div>
              <p>
                Professional home eye care for your whole family. Because no one should miss out on clear vision just because getting to a clinic is hard.
              </p>
              <div className="mt-3">
                <a
                  href="https://wa.me/923032632565"
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <i className="bi bi-whatsapp"></i>
                </a>
                <a href="tel:+923032632565" className="social-link" aria-label="Phone">
                  <i className="bi bi-telephone"></i>
                </a>
                <a href="#" className="social-link" aria-label="Facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>
            <div className="col-6 col-lg-2">
              <h6
                style={{
                  color: "rgba(255,255,255,.9)",
                  marginBottom: "1rem",
                  fontSize: ".85rem",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                }}
              >
                Services
              </h6>
              <a href="#services">Eye Examination</a>
              <a href="#services">Elderly Care</a>
              <a href="#services">Children's Vision</a>
              <a href="#services">Glasses Prescription</a>
              <a href="#services">Special Children Care</a>
            </div>
            <div className="col-6 col-lg-2">
              <h6
                style={{
                  color: "rgba(255,255,255,.9)",
                  marginBottom: "1rem",
                  fontSize: ".85rem",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                }}
              >
                Quick Links
              </h6>
              <a href="#why-us">Why Choose Us</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#testimonials">Reviews</a>
              <a href="#contact">Book Appointment</a>
            </div>
            <div className="col-lg-4">
              <div className="footer-contact">
                <h6
                  style={{
                    color: "rgba(255,255,255,.9)",
                    marginBottom: "1rem",
                    fontSize: ".85rem",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                  }}
                >
                  Contact Us
                </h6>

                <p className="mb-2">
                  <i className="bi bi-telephone me-2" style={{ color: "var(--teal-light)" }}></i>
                  <a href="tel:+923032632565" style={{ color: "rgba(255,255,255,.7)" }}>
                    0303-2632565
                  </a>
                </p>
                <p className="mb-2">
                  <i className="bi bi-whatsapp me-2" style={{ color: "#25d366" }}></i>
                  <a
                    href="https://wa.me/923032632565"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "rgba(255,255,255,.7)" }}
                  >
                    WhatsApp: 0303-2632565
                  </a>
                </p>
                <p>
                  <i className="bi bi-geo-alt me-2" style={{ color: "var(--teal-light)" }}></i>Karachi, Pakistan
                </p>
              </div>
            </div>
          </div>
          <hr className="footer-divider" />
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <p className="footer-copy mb-0">© 2026 Optics-N. All rights reserved.</p>
            <p className="footer-copy mb-0">Gentle Eye Care, Right at Your Door</p>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ────────────────────────────────────────────── */}
      <a
        href="https://wa.me/923032632565"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        title="WhatsApp Us"
      >
        <i className="bi bi-whatsapp"></i>
      </a>
    </>
  );
}
