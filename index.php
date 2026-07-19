<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Official Profile | Heartscript Studios</title>
    
    <!-- REQUIRED GOOGLE ADSENSE CODE AREA -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>

    <style>
        /* Core Reset & Global Dark Theme Styling */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            background-color: #030303;
            color: #f3f4f6;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            width: 100%;
            overflow-x: hidden;
            letter-spacing: -0.2px;
        }
        a {
            text-decoration: none;
            color: inherit;
        }

        /* Top Header Glow Navigation */
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 25px 6%;
            background-color: rgba(5, 5, 5, 0.8);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.03);
            width: 100%;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .logo {
            background: linear-gradient(135deg, #c084fc, #a855f7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 900;
            font-size: 1.4rem;
            letter-spacing: 2.5px;
            text-transform: uppercase;
        }
        nav ul {
            display: flex;
            list-style: none;
            gap: 35px;
        }
        nav ul li a {
            font-size: 0.95rem;
            color: #9ca3af;
            font-weight: 500;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            padding: 6px 0;
            position: relative;
        }
        nav ul li a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 1px;
            background-color: #06b6d4;
            transition: width 0.3s ease;
        }
        nav ul li a:hover::after, nav ul li a.active::after {
            width: 100%;
        }
        nav ul li a:hover, nav ul li a.active {
            color: #06b6d4;
            text-shadow: 0 0 10px rgba(6, 182, 212, 0.4);
        }

        /* Flexbox Studio Dashboard Grid */
        .wrapper {
            width: 88%;
            max-width: 1350px;
            margin: 60px auto 0 auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            gap: 60px;
            padding-bottom: 80px;
        }

        /* Left Main Panel Frame */
        .content-area {
            flex: 1;
            min-width: 0;
        }
        
        /* Right Sidebar Panel Frame */
        .sidebar-panel {
            width: 360px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            gap: 35px;
        }

        /* Hero Identity Display */
        .main-title {
            font-size: 3.2rem;
            font-weight: 900;
            letter-spacing: -1.5px;
            margin-bottom: 8px;
            background: linear-gradient(to right, #ffffff, #e9d5ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .main-subtitle {
            color: #6b7280;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 3px;
            margin-bottom: 40px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .main-subtitle::before {
            content: '';
            width: 8px;
            height: 8px;
            background-color: #a855f7;
            border-radius: 50%;
            display: inline-block;
            box-shadow: 0 0 8px #a855f7;
        }
        .bio-lead {
            color: #9ca3af;
            font-size: 1.1rem;
            line-height: 1.8;
            margin-bottom: 40px;
        }
        .bio-lead a {
            color: #06b6d4;
            font-weight: 600;
            transition: all 0.2s ease;
        }
        .bio-lead a:hover {
            text-shadow: 0 0 8px rgba(6, 182, 212, 0.5);
        }

        /* Cyber Style Index Box */
        .navigation-box {
            background: linear-gradient(135deg, #09090b, #0c0c0e);
            border: 1px solid rgba(255, 255, 255, 0.04);
            padding: 30px;
            border-radius: 8px;
            margin: 40px 0 50px 0;
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);
        }
        .navigation-box-title {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #4b5563;
            margin-bottom: 20px;
            font-weight: 800;
        }
        .navigation-links {
            list-style: none;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        .navigation-links li {
            font-size: 0.95rem;
        }
        .navigation-links li a {
            color: #9ca3af;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
        }
        .navigation-links li a:hover {
            color: #06b6d4;
            transform: translateX(4px);
        }

        /* Section Headers */
        .block-header {
            font-size: 1.4rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-top: 60px;
            margin-bottom: 25px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding-bottom: 12px;
            font-weight: 800;
        }
        .purple-accent { 
            background: linear-gradient(to right, #c084fc, #a855f7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .cyan-accent { 
            background: linear-gradient(to right, #22d3ee, #06b6d4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .body-paragraph {
            color: #9ca3af;
            font-size: 1.05rem;
            line-height: 1.8;
            margin-bottom: 30px;
        }

        /* Sleek Audio Catalog UI Cards */
        .media-row {
            background: linear-gradient(to right, #070709, #0b0b0d);
            border: 1px solid rgba(255, 255, 255, 0.03);
            padding: 28px 35px;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 30px;
            margin-bottom: 20px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .media-row:hover {
            border-color: rgba(168, 85, 247, 0.2);
            box-shadow: 0 10px 30px rgba(168, 85, 247, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.02);
            transform: translateY(-2px);
        }
        .media-details h4 {
            font-size: 1.25rem;
            color: #ffffff;
            margin-bottom: 8px;
            font-weight: 700;
            transition: color 0.3s ease;
        }
        .media-row:hover .media-details h4 {
            color: #c084fc;
        }
        .media-details p {
            color: #6b7280;
            font-size: 0.95rem;
            line-height: 1.6;
        }
        
        /* FIXED: Action Links Styled as Premium Buttons */
        .media-action-link {
            border: 1px solid rgba(6, 182, 212, 0.3);
            color: #06b6d4;
            padding: 10px 24px;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            white-space: nowrap;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: rgba(6, 182, 212, 0.02);
            display: inline-block;
            text-align: center;
        }
        .media-action-link:hover {
            background-color: #06b6d4;
            color: #000000;
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
            border-color: #06b6d4;
        }

        /* Glassmorphic Cyber Sidebar Panels */
        .profile-card {
            background: linear-gradient(135deg, #070709, #0c0c0e);
            border: 1px solid rgba(255, 255, 255, 0.04);
            padding: 35px;
            border-radius: 8px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .profile-card-header {
            text-align: center;
            margin-bottom: 25px;
        }
        .profile-card-header h3 {
            font-size: 1.4rem;
            color: #ffffff;
            font-weight: 800;
            letter-spacing: -0.5px;
        }
        .profile-card-header span {
            color: #a855f7;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 2.5px;
            display: block;
            margin-top: 6px;
            font-weight: 700;
        }
        
        .avatar-box {
            width: 100%;
            aspect-ratio: 1;
            background-color: #050505;
            border: 1px solid rgba(255, 255, 255, 0.03);
            border-radius: 6px;
            margin-bottom: 30px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }
        .avatar-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        .profile-card:hover .avatar-box img {
            transform: scale(1.03);
        }

        .metadata-table {
            list-style: none;
            font-size: 0.9rem;
        }
        .metadata-table li {
            margin-bottom: 14px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px dashed rgba(255, 255, 255, 0.04);
            padding-bottom: 10px;
        }
        .metadata-table li:last-child {
            margin-bottom: 0;
            border-bottom: none;
            padding-bottom: 0;
        }
        .metadata-table li .label {
            color: #4b5563;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 0.75rem;
            letter-spacing: 0.5px;
        }
        .metadata-table li .val {
            color: #d1d5db;
            font-weight: 500;
        }

        /* Milestone Metrics Container */
        .milestone-box {
            background: linear-gradient(135deg, #070709, #0c0c0e);
            border: 1px solid rgba(255, 255, 255, 0.04);
            padding: 35px;
            border-radius: 8px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .milestone-label {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #4b5563;
            margin-bottom: 25px;
            font-weight: 800;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding-bottom: 12px;
            text-align: center;
        }
        .milestone-group {
            margin-bottom: 24px;
            text-align: center;
        }
        .milestone-group:last-child {
            margin-bottom: 0;
        }
        .milestone-value {
            font-size: 1.8rem;
            font-weight: 900;
            letter-spacing: -0.5px;
            line-height: 1.2;
        }
        .milestone-subtext {
            font-size: 0.75rem;
            color: #6b7280;
            margin-top: 4px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
        }

        /* Ad Wireframes */
        .horizontal-ad {
            background-color: #050507;
            border: 1px dashed rgba(255, 255, 255, 0.06);
            padding: 25px;
            text-align: center;
            color: #374151;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            border-radius: 8px;
            margin-top: 45px;
            font-weight: 700;
        }
        .sidebar-ad-box {
            background-color: #050507;
            border: 1px dashed rgba(255, 255, 255, 0.06);
            width: 100%;
            height: 450px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #374151;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 700;
            padding: 20px;
        }

        /* High-End Widescreen Compliant Studio Footer */
        footer {
            background-color: #050507;
            border-top: 1px solid rgba(255, 255, 255, 0.03);
            padding: 50px 0;
            width: 100%;
            margin-top: 80px;
        }
        .footer-container {
            width: 88%;
            max-width: 1350px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .footer-copyright {
            color: #4b5563;
            font-size: 0.9rem;
            font-weight: 500;
        }
        .footer-brand-name {
            color: #c084fc;
            font-weight: 700;
        }
        .footer-nav {
            display: flex;
            gap: 35px;
        }
        .footer-nav a {
            color: #6b7280;
            font-size: 0.9rem;
            font-weight: 600;
            transition: color 0.3s ease;
        }
        .footer-nav a:hover {
            color: #06b6d4;
        }

        /* Fluid Layout Responsive Configurations */
        @media (max-width: 992px) {
            .wrapper {
                flex-direction: column;
                align-items: center;
                width: 90%;
                gap: 50px;
                margin-top: 40px;
            }
            .content-area {
                width: 100%;
            }
            .sidebar-panel {
                width: 100%;
                max-width: 420px;
            }
            .sidebar-ad-box {
                height: 250px;
            }
            header {
                flex-direction: column;
                gap: 20px;
                text-align: center;
                padding: 20px 6%;
            }
            .main-title {
                font-size: 2.5rem;
            }
            .footer-container {
                flex-direction: column;
                gap: 25px;
                text-align: center;
            }
            .navigation-links {
                grid-template-columns: 1fr;
                gap: 10px;
            }
        }
    </style>
</head>
<body>

    <!-- Header Navigation Section -->
    <header>
        <div class="logo">Heartscript Studios</div>
        <nav>
            <ul>
                <li><a href="index.php" class="active">Official Profile</a></li>
                <li><a href="portfolio.php">Services & Music</a></li>
                <li><a href="blog.php">Artist Blog</a></li>
                <li><a href="contact.php">Contact Us</a></li>
            </ul>
        </nav>
    </header>

    <!-- Main Flexbox Wrapper Framework -->
    <div class="wrapper">
        
        <!-- Left Column -->
        <main class="content-area">
            <h1 class="main-title">Mohammad Shafiuddeen (Shafi)</h1>
            <p class="main-subtitle">Founder | Songwriter | Director | Artist</p>

            <p class="bio-lead">
                Mohammad Shafiuddeen (born 1985), known professionally as Shafi, is an Indian independent sound designer, creative director, and writer based in Hyderabad, Telangana. He is the founder and director of <a href="portfolio.html">Heartscript Studios</a>, a decentralized creative hub specializing in dark pop, alt-pop, and atmospheric acoustic ballads. Shafi orchestrates complete media production timelines, combining original lyric frameworks with modern video synthesis architectures to translate raw psychological themes directly into fully realized multi-sensory worlds.
            </p>

            <!-- Table of Contents Directory -->
            <div class="navigation-box">
                <div class="navigation-box-title">System Directory</div>
                <ul class="navigation-links">
                    <li><a href="#early-life"><span>01 //</span> Early Life & Emotional Genesis</a></li>
                    <li><a href="#founding"><span>02 //</span> Founding of Heartscript Studios</a></li>
                    <li><a href="#philosophy"><span>03 //</span> Creative Philosophy & Workflow</a></li>
                    <li><a href="#discography"><span>04 //</span> Discography & Audio Assets</a></li>
                </ul>
            </div>

            <!-- Section 1 -->
            <h2 id="early-life" class="block-header purple-accent">1. Early Life & Emotional Genesis (2012)</h2>
            <p class="body-paragraph">
                Shafi's relationship with music creation began over a decade ago, driven by a deep personal interest in lyric writing as an authentic internal outlet to capture and process emotional landscapes. What started as raw text concepts tracked down on paper during periods of isolation served as the formal framework for his current production structures. This background establishes his dedication to composing arrangements that value narrative intimacy and human storytelling above generic trends.
            </p>

            <!-- Section 2 -->
            <h2 id="founding" class="block-header purple-accent">2. Founding of Heartscript Studios (2025)</h2>
            <p class="body-paragraph">
                Formally established to merge these conceptual scripts with active audio-visual delivery systems, Heartscript Studios serves as Shafi's primary independent release ecosystem. By creating specialized pipelines that map custom song layouts alongside automated media rendering technologies, the studio maintains an agile workspace capable of shifting musical files from raw draft structures into global public catalog entries smoothly.
            </p>

            <!-- Section 3 -->
            <h2 id="philosophy" class="block-header cyan-accent">3. Creative Philosophy & Technical Workflow</h2>
            <p class="body-paragraph">
                The core studio methodology focuses on translating distinct internal emotional layers into rigorous production outputs. The workflow effectively fuses traditional song design principles with modern computational synthesis assets. By synchronizing specific vocal structures with custom visual worlds utilizing advanced tools like Google Veo and Suno, the project guarantees a precise, atmospheric cinematic presentation across all streaming media directories.
            </p>

            <!-- Section 4 -->
            <h2 id="discography" class="block-header cyan-accent">4. Discography & Featured Tracks</h2>
            
            <!-- FIXED LINK 1: Replace placeholder with exact track link if needed -->
            <div class="media-row">
                <div class="media-details">
                    <h4>Shikayaton Ka Safar</h4>
                    <p>An acoustic pop ballad tracking themes of internal dialogue and processing distance via warm, minimal string elements.</p>
                </div>
                <a href="https://www.youtube.com/@HeartscriptStudiosOfficial" target="_blank" class="media-action-link">Watch Now</a>
            </div>

            <!-- FIXED LINK 2 -->
            <div class="media-row">
                <div class="media-details">
                    <h4>Blind To The Game</h4>
                    <p>A moody alt-pop arrangement dealing with emotional isolation through detailed synth patches and complex vocal layers.</p>
                </div>
                <a href="https://www.youtube.com/@HeartscriptStudiosOfficial" target="_blank" class="media-action-link">Watch Now</a>
            </div>

            <!-- FIXED LINK 3 -->
            <div class="media-row">
                <div class="media-details">
                    <h4>DEVOTION</h4>
                    <p>An uptempo dark pop track highlighting structured synthetic percussion pacing and intense vocal dynamics.</p>
                </div>
                <a href="https://www.youtube.com/@HeartscriptStudiosOfficial" target="_blank" class="media-action-link">Watch Now</a>
            </div>

            <!-- FIXED LINK 4 -->
            <div class="media-row">
                <div class="media-details">
                    <h4>Gunaah</h4>
                    <p>A down-tempo cinematic piece tracking structural character vulnerabilities against spacious audio backgrounds.</p>
                </div>
                <a href="https://www.youtube.com/@HeartscriptStudiosOfficial" target="_blank" class="media-action-link">Watch Now</a>
            </div>

            <!-- FIXED LINK 5 -->
            <div class="media-row">
                <div class="media-details">
                    <h4>Humdard (Phonk Fusion Remix)</h4>
                    <p>An experimental framework fusing organic acoustic wood elements with aggressive sub-bass rhythm lines.</p>
                </div>
                <a href="https://www.youtube.com/@HeartscriptStudiosOfficial" target="_blank" class="media-action-link">Watch Now</a>
            </div>

            <!-- Bottom Horizontal Ad Unit -->
            <div class="horizontal-ad">
                Advertisement Space (Horizontal Unit)
            </div>

        </main>

        <!-- Right Side Sidebar Column -->
        <aside class="sidebar-panel">
            
            <!-- Profile Metadata Card -->
            <div class="profile-card">
                <div class="profile-card-header">
                    <h3>Shafi</h3>
                    <span>Artist Profile</span>
                </div>
                
                <div class="avatar-box">
                    <img src="logo.jpg" alt="Heartscript Studios Logo">
                </div>

                <ul class="metadata-table">
                    <li><span class="label">Director</span> <span class="val">Heartscript Studios</span></li>
                    <li><span class="label">Born</span> <span class="val">1985 (Age 41)</span></li>
                    <li><span class="label">Founded</span> <span class="val">August 2025</span></li>
                    <li><span class="label">Based In</span> <span class="val">Hyderabad, India</span></li>
                    <li><span class="label">Focus</span> <span class="val">Dark Pop & Alt-Pop</span></li>
                    <li><span class="label">Distribution</span> <span class="val">Spotify / YouTube</span></li>
                </ul>
            </div>

            <!-- Metrics Box -->
            <div class="milestone-box">
                <div class="milestone-label">Data Metrics</div>
                
                <div class="milestone-group">
                    <div class="milestone-value" style="color: #ef4444; text-shadow: 0 0 15px rgba(239, 68, 68, 0.3);">75,000+</div>
                    <div class="milestone-subtext">YouTube Views</div>
                </div>

                <div class="milestone-group">
                    <div class="milestone-value" style="color: #22c55e; text-shadow: 0 0 15px rgba(34, 197, 94, 0.3);">5,000+</div>
                    <div class="milestone-subtext">Spotify Streams</div>
                </div>

                <div class="milestone-group">
                    <div class="milestone-value" style="color: #f97316; text-shadow: 0 0 15px rgba(249, 115, 22, 0.3);">10,000+</div>
                    <div class="milestone-subtext">Amazon Music Plays</div>
                </div>
            </div>

            <!-- Vertical Skyscraper Ad Wireframe -->
            <div class="sidebar-ad-box">
                Advertisement Space (Vertical Skyscraper Unit)
            </div>

        </aside>

    </div>

    <!-- Compliant Studio Footer -->
    <footer>
        <div class="footer-container">
            <div class="footer-copyright">
                &copy; 2026 <span class="footer-brand-name">Heartscript Studios</span>. All rights reserved.
            </div>
            <div class="footer-nav">
                <a href="index.html">Official Profile</a>
                <a href="privacy.html">Privacy Policy</a>
            </div>
        </div>
    </footer>

</body>
</html>
Change home page to PHP
