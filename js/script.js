document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selectors ---
    const themeToggleButton = document.getElementById('themeToggle');
    const langEnButton = document.getElementById('langEn');
    const langFaButton = document.getElementById('langFa');
    const themeIcon = themeToggleButton ? themeToggleButton.querySelector('.material-icons-outlined') : null;
    const navLinks = document.querySelectorAll('header nav a'); // Will now include CV button if it's an <a>
    const sections = document.querySelectorAll('section[id]');
    const scrollTargets = document.querySelectorAll('.scroll-target');
    const currentYearSpan = document.getElementById('currentYear');

    // --- Theme Toggle Functionality ---
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            if (themeIcon) themeIcon.textContent = 'light_mode';
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            if (themeIcon) themeIcon.textContent = 'dark_mode';
            localStorage.setItem('theme', 'light');
        }
    }

    if (themeToggleButton && themeIcon) {
        themeToggleButton.addEventListener('click', () => {
            const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });

        // Initialize theme button icon based on current theme (already set by inline script)
        if (document.documentElement.classList.contains('dark')) {
            themeIcon.textContent = 'light_mode';
        } else {
            themeIcon.textContent = 'dark_mode';
        }
    } else {
        console.warn("Theme toggle button or icon not found.");
    }

    // --- Language Data (Translations) ---
    const translations = {
        siteTitle: { en: "Mohammad Sediq Abazari", fa: "محمدصادق اباذری" },
        navAbout: { en: "About", fa: "درباره من" },
        navEducation: { en: "Education", fa: "تحصیلات" },
        navResearch: { en: "Research", fa: "علایق پژوهشی" },
        navPublications: { en: "Publications", fa: "انتشارات" },
        navSkills: { en: "Skills", fa: "مهارت‌ها" },
        navContact: { en: "Contact", fa: "تماس" },
        navCV: { en: "CV", fa: "رزومه" }, // Added translation for CV button
        heroName: { en: "Mohammad Sediq Abazari, M.Sc.", fa: "محمدصادق اباذری، کارشناسی ارشد" },
        heroTitle: { en: "Aspiring PhD Candidate in Computer Science", fa: "داوطلب دکتری علوم کامپیوتر" },
        heroBio: { en: "Highly motivated and research-oriented Computer Engineer with a Master's degree from Ferdowsi University of Mashhad. Passionate about leveraging machine learning, network engineering, and data analysis to solve complex problems. Seeking a challenging PhD position to contribute to cutting-edge research in Computer Science.", fa: "مهندس کامپیوتر بسیار با انگیزه و پژوهش محور با مدرک کارشناسی ارشد از دانشگاه فردوسی مشهد. علاقه‌مند به استفاده از یادگیری ماشین، مهندسی شبکه و تحلیل داده برای حل مسائل پیچیده. به دنبال یک موقعیت چالش برانگیز دکتری برای مشارکت در تحقیقات پیشرفته در علوم کامپیوتر." },
        heroCTA: { en: "Get in Touch", fa: "ارتباط با من" },
        educationTitle: { en: "Education", fa: "تحصیلات" },
        mscDate: { en: "09/2020 - 08/2023", fa: "۱۳۹۹/۰۶ - ۱۴۰۲/۰۵" },
        mscDegree: { en: "M.Sc. Computer Engineer (Network Engineer Branch)", fa: "کارشناسی ارشد مهندسی کامپیوتر (گرایش شبکه)" },
        mscUniversity: { en: "Ferdowsi University of Mashhad", fa: "دانشگاه فردوسی مشهد" },
        mscThesisLabel: { en: "Thesis:", fa: "پایان‌نامه:" },
        mscThesisTitle: { en: "Network assurance in intent-based Network by energy efficiency approach.", fa: "تضمین شبکه در شبکه مبتنی بر قصد با رویکرد بهره‌وری انرژی." },
        supervisorLabel: { en: "Supervisor:", fa: "استاد راهنما:" },
        gpaLabel: { en: "GPA:", fa: "معدل:" },
        mscSupervisor: { en: "Mohammad Hossein Yaghmaee Moghaddam", fa: "محمدحسین یغمائی مقدم" },
        mscGPA: { en: "17.78 / 20 (Ranked 3rd)", fa: "۱۷.۷۸ از ۲۰ (رتبه سوم)" },
        bscDate: { en: "09/2015 - 02/2020", fa: "۱۳۹۴/۰۶ - ۱۳۹۸/۱۱" },
        bscDegree: { en: "B.Sc. Computer Engineer (Software Engineer)", fa: "کارشناسی مهندسی کامپیوتر (گرایش نرم‌افزار)" },
        bscUniversity: { en: "University of Bojnord", fa: "دانشگاه بجنورد" },
        bscProjectLabel: { en: "Final Project:", fa: "پروژه پایانی:" },
        bscProjectTitle: { en: "Health care system production and patient health data analysis.", fa: "تولید سامانه مراقبت‌های بهداشتی و تحلیل داده‌های سلامت بیمار." },
        bscSupervisor: { en: "Mehran Garmehi", fa: "مهران گرمه‌ای" },
        bscGPA: { en: "16.2 / 20 (Ranked 2nd)", fa: "۱۶.۲ از ۲۰ (رتبه دوم)" },
        researchTitle: { en: "Research Interests", fa: "علایق پژوهشی" },
        researchML: { en: "Machine Learning", fa: "یادگیری ماشین" },
        researchNN: { en: "Neural Networks", fa: "شبکه‌های عصبی" },
        researchDL: { en: "Deep Learning", fa: "یادگیری عمیق" },
        researchDM: { en: "Data Mining", fa: "داده‌کاوی" },
        researchCybersec: { en: "Cybersecurity", fa: "امنیت سایبری" },
        researchSE: { en: "Software Engineering", fa: "مهندسی نرم‌افزار" },
        researchBigData: { en: "Big Data Analysis", fa: "تحلیل داده‌های بزرگ" },
        researchNetworkArch: { en: "Future Network Architecture", fa: "معماری شبکه آینده" },
        researchDistributed: { en: "Distributed Systems", fa: "سیستم‌های توزیع‌شده" },
        researchIoV: { en: "Internet of Vehicles (IoV)", fa: "اینترنت وسایل نقلیه (IoV)" },
        publicationsTitle: { en: "Publications", fa: "انتشارات" },
        pub1Title: { en: "Pruning and Mixed Precision Techniques for Accelerating Neural Network", fa: "تکنیک‌های هرس و دقت ترکیبی برای تسریع شبکه عصبی" },
        pub1Authors: { en: "Authors: Mahsa Zahedi, Mohammad.s Abazari, Abdorreza Savadi.", fa: "نویسندگان: مهسا زاهدی، محمدصادق اباذری، عبدالرضا سوادی." },
        pub1Venue: { en: "13th conference of ICCKE (IEEE supported). Accepted 9/2023.", fa: "سیزدهمین کنفرانس ICCKE (تحت حمایت IEEE). پذیرفته شده در ۹/۲۰۲۳." },
        pub2Title: { en: "Data center Energy Optimization through Request Type Analysis and Real-time Power Consumption Prediction", fa: "بهینه‌سازی انرژی مرکز داده از طریق تحلیل نوع درخواست و پیش‌بینی مصرف برق در زمان واقعی" },
        pub2Authors: { en: "Authors: Mohammad.s Abazari, Mahsa Zahedi, Mohammad.h Yaghmaee.", fa: "نویسندگان: محمدصادق اباذری، مهسا زاهدی، محمدحسین یغمائی." },
        pub2Venue: { en: "The 4th international Conference on Electronic Engineering, Computer, Mechanics and Artificial Intelligence. Accepted 10/2023.", fa: "چهارمین کنفرانس بین‌المللی مهندسی الکترونیک، کامپیوتر، مکانیک و هوش مصنوعی. پذیرفته شده در ۱۰/۲۰۲۳." },
        pub3Title: { en: "Energy Consumption Optimization of Data Centers in Intent-Based Networking by Network Assurance Engine", fa: "بهینه‌سازی مصرف انرژی مراکز داده در شبکه‌بندی مبتنی بر قصد توسط موتور تضمین شبکه" },
        pub3Authors: { en: "Authors: Mohammad.s Abazari, Mohammad.h Yaghmaee.", fa: "نویسندگان: محمدصادق اباذری، محمدحسین یغمائی." },
        pub3Venue: { en: "Springer Journal of Energy Efficient. (Under Review)", fa: "مجله Springer Journal of Energy Efficient. (در دست بررسی)" },
        pub4Title: { en: "Enhancement of Performance and Tensor Network Pruning through Core-Based Matrix Compression", fa: "بهبود عملکرد و هرس شبکه تانسوری از طریق فشرده‌سازی ماتریس مبتنی بر هسته" },
        pub4Authors: { en: "Authors: Mahsa Zahedi, Mohammad.s Abazari, Abdorreza Savadi.", fa: "نویسندگان: مهسا زاهدی، محمدصادق اباذری، عبدالرضا سوادی." },
        pub4Venue: { en: "IEEE Transactions on Artificial Intelligence. (Under Review)", fa: "IEEE Transactions on Artificial Intelligence. (در دست بررسی)" },
        googleScholarLink: { en: "View on Google Scholar", fa: "مشاهده در گوگل اسکالر" },
        skillsTitle: { en: "Skills", fa: "مهارت‌ها" },
        skillsCoding: { en: "Coding Languages", fa: "زبان‌های برنامه‌نویسی" },
        skillsCodingList: { en: "Python, Java, Android, VHDL, PHP, HTML, CSS, Laravel, TeX", fa: "پایتون، جاوا، اندروید، VHDL، PHP، HTML، CSS، لاراول، تک" },
        skillsDatabases: { en: "Databases", fa: "پایگاه‌های داده" },
        skillsDatabasesList: { en: "MySQL, SQLite", fa: "MySQL، SQLite" },
        skillsWebDev: { en: "Web Development", fa: "توسعه وب" },
        skillsWebDevList: { en: "HTML, CSS, JavaScript, Apache Web Server", fa: "HTML، CSS، جاوااسکریپت، وب سرور آپاچی" },
        skillsSoftware: { en: "Software & Tools", fa: "نرم‌افزارها و ابزارها" },
        skillsSoftwareList: { en: "Anaconda, Jupyter Notebook, PyCharm, WebStorm, Visual Studio, Android Studio, Arduino IDE, Texmaker, Office Suite, Adobe Photoshop", fa: "آناکوندا، ژوپیتر نوتبوک، پای‌چارم، وب‌استورم، ویژوال استودیو، اندروید استودیو، آردوینو IDE، تک‌میکر، مجموعه آفیس، ادوبی فتوشاپ" },
        skillsLanguages: { en: "Languages", fa: "زبان‌ها" },
        skillsLangPersion: { en: "Persian (Native)", fa: "فارسی (زبان مادری)" },
        skillsLangEnglish: { en: "English (Duolingo: 135 - Literacy 145, Comprehension 140, Conversation 115, Production 105)", fa: "انگلیسی (دولینگو: ۱۳۵ - سواد ۱۴۵، درک مطلب ۱۴۰، مکالمه ۱۱۵، تولید ۱۰۵)" },
        skillsMisc: { en: "Miscellaneous", fa: "متفرقه" },
        skillsMiscList: { en: "Academic Research, Teaching, Training, TeX Typesetting, Graphic Design, Network Configuration, PC Assembling", fa: "تحقیقات دانشگاهی، تدریس، آموزش، حروفچینی با تک، طراحی گرافیک، پیکربندی شبکه، مونتاژ کامپیوتر" },
        contactTitle: { en: "Contact Me", fa: "تماس با من" },
        contactIntro: { en: "I'm actively seeking PhD opportunities and collaborations. Feel free to reach out!", fa: "من فعالانه به دنبال فرصت‌های دکتری و همکاری هستم. برای ارتباط با من راحت باشید!" },
        linkedinProfile: { en: "linkedin.com/in/mohammad-s-abazari", fa: "پروفایل لینکدین من" },
        footerName: { en: "Mohammad Sediq Abazari", fa: "محمدصادق اباذری" },
        footerRights: { en: "All Rights Reserved.", fa: "تمامی حقوق محفوظ است." },
        footerLastUpdated: { en: "Last Updated:", fa: "آخرین بروزرسانی:" },
        footerDate: { en: "March 1, 2024", fa: "۱۱ اسفند ۱۴۰۲" }
    };

    // --- Language Switcher Functionality ---
    function applyLanguage(lang) {
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (translations[key] && translations[key][lang]) {
                // For the CV button, we need to handle the text node separately from the icon
                if (key === 'navCV' && el.childNodes.length > 1) {
                    // Assuming the text is the last child node
                    el.childNodes[el.childNodes.length -1].nodeValue = translations[key][lang];
                } else {
                    el.textContent = translations[key][lang];
                }
            }
        });

        const body = document.body;
        const htmlEl = document.documentElement;
        if (lang === 'fa') {
            body.classList.add('rtl-layout');
            htmlEl.setAttribute('lang', 'fa');
            if(langFaButton) langFaButton.classList.add('font-semibold', 'text-sky-700', 'dark:text-sky-300', 'bg-white', 'dark:bg-gray-600');
            if(langEnButton) langEnButton.classList.remove('font-semibold', 'text-sky-700', 'dark:text-sky-300', 'bg-white', 'dark:bg-gray-600');
        } else { // 'en' or default
            body.classList.remove('rtl-layout');
            htmlEl.setAttribute('lang', 'en');
            if(langEnButton) langEnButton.classList.add('font-semibold', 'text-sky-700', 'dark:text-sky-300', 'bg-white', 'dark:bg-gray-600');
            if(langFaButton) langFaButton.classList.remove('font-semibold', 'text-sky-700', 'dark:text-sky-300', 'bg-white', 'dark:bg-gray-600');
        }
        localStorage.setItem('language', lang);
        updateTimelineLayout(lang); // Update timeline layout on language change
    }

    function updateTimelineLayout(lang) {
        const timelineDateWrappers = document.querySelectorAll('.timeline-date-wrapper');
        const timelineContentWrappers = document.querySelectorAll('.timeline-content-wrapper');

        if (window.innerWidth >= 768) { // md breakpoint (Tailwind's md is 768px)
            const isRTL = lang === 'fa';
            timelineDateWrappers.forEach(el => {
                el.classList.toggle('md:text-right', !isRTL);
                el.classList.toggle('md:pr-10', !isRTL);
                el.classList.toggle('md:text-left', isRTL);
                el.classList.toggle('md:pl-10', isRTL);
            });
            timelineContentWrappers.forEach(el => {
                el.classList.toggle('md:pl-10', !isRTL);
                el.classList.toggle('md:pr-10', isRTL);
            });
        }
    }


    if (langEnButton && langFaButton) {
        langEnButton.addEventListener('click', () => applyLanguage('en'));
        langFaButton.addEventListener('click', () => applyLanguage('fa'));

        const savedLang = localStorage.getItem('language') || 'en'; // Default to English
        applyLanguage(savedLang);
    } else {
        console.warn("Language toggle buttons not found.");
    }

    // --- Active Navigation Link Highlighting (Scrollspy) ---
    function updateActiveNavLink() {
        let currentSectionId = '';
        // Find the current section based on scroll position
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // 80px offset for sticky header height + a little buffer
            if (window.pageYOffset >= sectionTop - 80) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Iterate over actual navigation links, excluding the CV download button for active state
        document.querySelectorAll('header nav a:not([download])').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
        
        const firstNavLink = document.querySelector('header nav a:not([download])');

        if (!currentSectionId && firstNavLink && sections.length > 0 && window.pageYOffset < sections[0].offsetTop - 80) {
            const aboutLink = document.querySelector('header nav a[href="#about"]');
            if (aboutLink) {
                document.querySelectorAll('header nav a:not([download])').forEach(link => link.classList.remove('active'));
                aboutLink.classList.add('active');
            }
        } else if (!currentSectionId && firstNavLink && sections.length === 0) {
             document.querySelectorAll('header nav a:not([download])').forEach(link => link.classList.remove('active'));
             firstNavLink.classList.add('active');
        }
    }

    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('load', updateActiveNavLink); 

    // --- Intersection Observer for Scroll Animations ---
    if (scrollTargets.length > 0) {
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% of item visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    const isRTL = document.body.classList.contains('rtl-layout');
                    if (entry.target.closest('.timeline-date-wrapper')) {
                        entry.target.style.transform = isRTL ? 'translateX(30px)' : 'translateX(-30px)';
                    } else if (entry.target.closest('.timeline-content-wrapper')) {
                        entry.target.style.transform = isRTL ? 'translateX(-30px)' : 'translateX(30px)';
                    } else { 
                        entry.target.style.transform = 'translateY(20px)';
                    }
                } 
            });
        };

        const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
        scrollTargets.forEach(target => {
            const isRTL = document.body.classList.contains('rtl-layout');
            if (target.closest('.timeline-date-wrapper')) {
                target.style.transform = isRTL ? 'translateX(30px)' : 'translateX(-30px)';
            } else if (target.closest('.timeline-content-wrapper')) {
                target.style.transform = isRTL ? 'translateX(-30px)' : 'translateX(30px)';
            } else {
                target.style.transform = 'translateY(20px)';
            }
            scrollObserver.observe(target);
        });
    } else {
        console.warn("No elements with class 'scroll-target' found for animations.");
    }

    // --- Footer: Set Current Year ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    } else {
        console.warn("Current year span in footer not found.");
    }
});
