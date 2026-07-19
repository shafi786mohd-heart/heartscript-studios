<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Services & Production Portfolio | Heartscript Studios</title>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: #030303; color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; overflow-x: hidden; }
        a { text-decoration: none; color: inherit; }
        
        header { display: flex; justify-content: space-between; align-items: center; padding: 25px 6%; background-color: rgba(5, 5, 5, 0.8); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.03); position: sticky; top: 0; z-index: 100; }
        .logo { background: linear-gradient(135deg, #c084fc, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 900; font-size: 1.4rem; letter-spacing: 2.5px; text-transform: uppercase; }
        nav ul { display: flex; list-style: none; gap: 35px; }
        nav ul li a { font-size: 0.95rem; color: #9ca3af; font-weight: 500; transition: all 0.3s; padding: 6px 0; position: relative; }
        nav ul li a::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background-color: #06b6d4; transition: width 0.3s; }
        nav ul li a:hover::after, nav ul li a.active::after { width: 100%; }
        nav ul li a:hover, nav ul li a.active { color: #06b6d4; text-shadow: 0 0 10px rgba(6, 182, 212, 0.4); }
        
        .container { width: 88%; max-width: 900px; margin: 60px auto; padding-bottom: 80px; }
        
        .page-title { font-size: 2.8rem; font-weight: 900; letter-spacing: -1px; margin-bottom: 4px; background: linear-gradient(to right, #ffffff, #e9d5ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-align: center; }
        .page-subtitle { color: #6b7280; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 50px; text-align: center; font-weight: 600; }
        
        .section-header { font-size: 1.1rem; text-transform: uppercase; letter-spacing: 2px; margin-top: 50px; margin-bottom: 25px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 12px; font-weight: 800; color: #06b6d4; }
        
        .grid-twocol { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 30px; }
        .card { background: linear-gradient(135deg, #070709, #0c0c0e); border: 1px solid rgba(255, 255, 255, 0.04); padding: 30px; border-radius: 8px; }
        .card h3 { font-size: 1.1rem; color: #ffffff; margin-bottom: 12px; font-weight: 700; letter-spacing: -0.3px; }
        .card p { color: #9ca3af; font-size: 0.9rem; line-height: 1.7; }
        
        .price-tag { font-size: 1.5rem; font-weight: 800; color: #a855f7; margin-bottom: 10px; display: block; }
        .price-sub { font-size: 0.8rem; color: #6b7280; font-weight: 500; }
        
        .policy-box { background: rgba(7, 7, 9, 0.6); border: 1px dashed rgba(255, 255, 255, 0.05); padding: 30px; border-radius: 8px; margin-bottom: 40px; }
        .policy-title { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; color: #4b5563; margin-bottom: 15px; font-weight: 800; }
        .policy-box ul { list-style: none; }
        .policy-box ul li { color: #9ca3af; font-size: 0.9 /; margin-bottom: 12px; padding-left: 20px; position: relative; line-height: 1.6; }
        .policy-box ul li::before { content: '•'; color: #a855f7; position: absolute; left: 0; font-size: 1.2rem; top: -2px; }
        .policy-box ul li strong { color: #ffffff; font-weight: 600; }
        
        .breakdown-row { background: linear-gradient(to right, #070709, #0b0b0d); border: 1px solid rgba(255, 255, 255, 0.03); padding: 30px 35px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; gap: 40px; margin-bottom: 25px; transition: all 0.4s; }
        .breakdown-row:hover { border-color: rgba(168, 85, 247, 0.2); transform: translateY(-2px); }
        .breakdown-details { flex: 1; }
        .breakdown-tag { background-color: rgba(168, 85, 247, 0.1); color: #c084fc; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 4px 10px; border-radius: 4px; display: inline-block; margin-bottom: 12px; }
        .breakdown-details h4 { font-size: 1.3rem; color: #ffffff; margin-bottom: 8px; font-weight: 700; }
        .breakdown-details p { color: #9ca3af; font-size: 0.95rem; line-height: 1.6; }
        
        .action-link { color: #06b6d4; font-size: 0.9rem; font-weight: 700; white-space: nowrap; transition: all 0.3s; display: flex; align-items: center; gap: 6px; }
        .action-link:hover { text-shadow: 0 0 10px rgba(6, 182, 212, 0.6); color: #22d3ee; }
        
        .horizontal-ad { background-color: #050507; border: 1px dashed rgba(255, 255, 255, 0.06); padding: 25px; text-align: center; color: #374151; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; border-radius: 8px; margin: 40px 0; font-weight: 700; }

        footer { background-color: #050507; border-top: 1px solid rgba(255, 255, 255, 0.03); padding: 50px 0; margin-top: 80px; }
        .footer-container { width: 88%; max-width: 900px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
        .footer-copyright { color: #4b5563; font-size: 0.9rem; }
        .footer-brand-name { color: #c084fc; font-weight: 700; }
        .footer-nav { display: flex; gap: 35px; }
        .footer-nav a { color: #6b7280; font-size: 0.9rem; transition: color 0.3s; }
        .footer-nav a:hover { color: #06b6d4; }

        @media (max-width: 768px) { .grid-twocol { grid-template-columns: 1fr; } .breakdown-row { flex-direction: column; align-items: flex-start; gap: 20px; padding: 25px; } header { flex-direction: column; gap: 15px; } .footer-container { flex-direction: column; gap: 20px; } }
    </style>
</head>
<body>

    <header>
        <div class="logo">Heartscript Studios</div>
        <nav>
            <ul>
                <li><a href="index.php">Official Profile</a></li>
                <li><a href="portfolio.php" class="active">Services & Music</a></li>
                <li><a href="blog.php">Artist Blog</a></li>
                <li><a href="contact.php">Contact Us</a></li>
            </ul>
        </nav>
    </header>

    <div class="container">
        <h1 class="page-title">Services & Production Portfolio</h1>
        <p class="page-subtitle">Production Pipelines & Project Breakdowns</p>

        <!-- AdSense Compliance Slot 1 -->
        <div class="horizontal-ad">Advertisement Space (AdSense Header Unit)</div>

        <!-- Section 1 -->
        <h2 class="section-header">1. Professional Creative Services</h2>
        <div class="grid-twocol">
            <div class="card">
                <h3>Independent Sound Design & Composition</h3>
                <p>Custom arrangement pathways tailoring dark pop aesthetics, atmospheric sonic melodies, and deep sub-bass configurations targeted to moody or modern lyrical counterpoints.</p>
            </div>
            <div class="card">
                <h3>AI-Driven Video Synthesis Pipelines</h3>
                <p>Advanced content production workflows leveraging high-end generation processing units to translate structural sound spaces and render detailed cinematic video timelines.</p>
            </div>
        </div>

        <!-- Section 2 -->
        <h2 class="section-header">2. Standard Service Rates</h2>
        <div class="grid-twocol">
            <div class="card">
                <h3>AI-Driven Video Production</h3>
                <span class="price-tag">₹10,000 <span class="price-sub">/ per project</span></span>
                <p>Full-length dynamic audio-to-video pipeline compilation rendering custom high-ground configurations customized for independent modern music tracking.</p>
            </div>
            <div class="card">
                <h3>Custom Studio Thumbnails</h3>
                <span class="price-tag">₹1,000 <span class="price-sub">/ per design</span></span>
                <p>High-impact, asset-generative artwork tailored for YouTube, Spotify canvas distribution, and digital marketing materials matched to distinct conceptual styles.</p>
            </div>
        </div>

        <!-- Policy Subsystem Container -->
        <div class="policy-box">
            <div class="policy-title">Collaboration Policies</div>
            <ul>
                <li><strong>Payment Terms:</strong> All project bookings require a 50% upfront non-refundable booking deposit required before workflow initialization parameters execute.</li>
                <li><strong>Revision Limits:</strong> Video production packaging includes up to 2 major timeline revisions. Thumbnail projects include 1 modification round; additional modifications are billed separately.</li>
                <li><strong>Creative Alignment:</strong> All deliverable designs match the signatures of a dark pop, cinematic, or atmospheric style demonstrated across the showcase tracking portfolio.</li>
            </ul>
        </div>

        <!-- AdSense Compliance Slot 2 -->
        <div class="horizontal-ad">Advertisement Space (AdSense Mid-Page Unit)</div>

        <!-- Section 3 -->
        <h2 class="section-header">3. Featured Project Breakdowns</h2>

        <div class="breakdown-row">
            <div class="breakdown-details">
                <span class="breakdown-tag">Cinematic Project</span>
                <h4>Blind To The Game (Official Release)</h4>
                <p>A primary production exploration targeting the raw psychology of emotional isolation, balancing unique synth layers combined with urgent vocal frequencies to emphasize deep storytelling architecture.</p>
            </div>
            <a href="https://youtu.be/jbFDop09as4?si=PqjoGkKYiiWOH4MR" target="_blank" class="action-link">View Project Materials &rarr;</a>
        </div>

        <div class="breakdown-row">
            <div class="breakdown-details">
                <span class="breakdown-tag">Phonk Fusion</span>
                <h4>Hamdard (Dark Pop Fusion Remix)</h4>
                <p>An experimental production scheme fusing organic acoustic string frames directly with intense aggressive sub-bass modulations, validation processing, and master routing capabilities.</p>
            </div>
            <a href="https://youtu.be/4Mzou4mNc_A?si=q6ZFVtERJ1rzc-dI" target="_blank" class="action-link">Review Sound Structure &rarr;</a>
        </div>

    </div>

    <footer>
        <div class="footer-container">
            <div class="footer-copyright">
                &copy; <?php echo date('Y'); ?> <span class="footer-brand-name">Heartscript Studios</span>. All rights reserved.
            </div>
            <div class="footer-nav">
                <a href="index.php">Official Profile</a>
                <a href="privacy.html">Privacy Policy</a>
            </div>
        </div>
    </footer>

</body>
</html>
