const fs = require('fs');

let html = fs.readFileSync('c:/Users/shahn/OneDrive/Desktop/dhirajfood.com/index.html', 'utf8');

// 1. Remove Mobile Menu HTML
html = html.replace(/<div class="menu-toggle" id="mobile-menu">[\s\S]*?<i class="fa-solid fa-bars"><\/i>[\s\S]*?<\/div>/, '');
html = html.replace(/<div class="close-btn" id="close-btn">.*?<\/div>/, '');
html = html.replace(/<div class="nav-logo-mobile">[\s\S]*?<\/div>/, '');

// 2. Remove SVG Waves from Product Cards
html = html.replace(/<svg class="card-wave".*?<\/svg>/g, '');

// 3. Update About Right Section (Stats Grid & Nepal Flag)
const aboutRightRegex = /<div class="about-right">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;
const newAboutRight = `<div class="about-right">
                <div class="stats-grid">
                    <div class="stat-card">
                        <h3>25+</h3>
                        <p>Years Experience</p>
                    </div>
                    <div class="stat-card">
                        <h3>100%</h3>
                        <p>Premium Quality</p>
                    </div>
                    
                    <!-- Center Flag -->
                    <div class="center-logo">
                        <img src="https://cdn3.emoji.gg/unicode/apple/flag-for-nepal.png" alt="Nepal Flag">
                    </div>

                    <div class="stat-card">
                        <h3>35+</h3>
                        <p>Product</p>
                    </div>
                    <div class="stat-card">
                        <h3>30+</h3>
                        <p>Cities in Nepal</p>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
html = html.replace(aboutRightRegex, newAboutRight);

// 4. Update Map Iframe URL
html = html.replace(/<iframe src="https:\/\/www\.google\.com\/maps\/embed.*?>.*?<\/iframe>/, '<iframe src="https://maps.google.com/maps?q=Dhiraj+Food+Repacking,+Birgunj&t=&z=17&ie=UTF8&iwloc=&output=embed" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>');

// 5. Remove Mobile Menu JS Logic
html = html.replace(/\/\/\s*Mobile Menu Logic[\s\S]*?\}\);/g, '');

fs.writeFileSync('c:/Users/shahn/OneDrive/Desktop/dhirajfood.com/index.html', html);
console.log('index.html updated successfully');

// NOW UPDATE CSS
let css = fs.readFileSync('c:/Users/shahn/OneDrive/Desktop/dhirajfood.com/style.css', 'utf8');

css = css.replace(/\.menu-toggle\s*{[\s\S]*?}/g, '');
css = css.replace(/\.close-btn\s*{[\s\S]*?}/g, '');
css = css.replace(/\.nav-logo-mobile\s*{[\s\S]*?}/g, '');
css = css.replace(/@media\(max-width:768px\)\s*{\s*\.menu-toggle[\s\S]*?}\s*}\s*/, '');

const newMobileNavCSS = `
@media(max-width:768px){
    header {
        flex-direction: column;
        gap: 15px;
        padding: 15px 5%;
    }
    nav ul {
        flex-wrap: wrap;
        justify-content: center;
        gap: 15px;
    }
    nav ul li a {
        font-size: 13px;
    }
    .btn-contact {
        padding: 6px 16px;
    }
    .hero-slider-section {
        padding-top: 50px;
    }
}
`;
css = css.replace(/\/\* Mobile Nav \*\//, '/* Mobile Nav */' + newMobileNavCSS);

css = css.replace(/\.card-bottom\s*{\s*position:\s*relative;\s*background:\s*var\(--green\);\s*margin-top:\s*auto;\s*}/, '.card-bottom { position: relative; background: transparent; margin-top: auto; }');
css = css.replace(/\.card-wave\s*{[\s\S]*?}/, '');
css = css.replace(/\.card-title-box\s*{[\s\S]*?}/, '.card-title-box { padding: 15px 20px 25px; background: transparent; position: relative; z-index: 2; }');
css = css.replace(/\.card-title-box h3\s*{\s*color:\s*var\(--white\);\s*font-size:\s*22px;\s*font-weight:\s*600;\s*margin:\s*0;\s*}/, '.card-title-box h3 { color: var(--green); font-size: 20px; font-weight: 700; margin: 0; }');

const oldAboutRight = /\.about-right\s*{[\s\S]*?}/;
const oldStatCard1 = /\.stat-card\s*{[\s\S]*?}/;
const oldStatCard2 = /\.stat-card:hover\s*{[\s\S]*?}/;
const oldStatCard3 = /\.stat-card h3\s*{[\s\S]*?}/;
const oldStatCard4 = /\.stat-card p\s*{[\s\S]*?}/;
const oldNepalFlag = /\.nepal-flag\s*{[\s\S]*?}/;

css = css.replace(oldAboutRight, '');
css = css.replace(oldStatCard1, '');
css = css.replace(oldStatCard2, '');
css = css.replace(oldStatCard3, '');
css = css.replace(oldStatCard4, '');
css = css.replace(oldNepalFlag, '');

const newAboutStatsCSS = `
.about-right {
    position: relative;
}
.stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    position: relative;
}
.center-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 15px rgba(0,0,0,0.15);
    z-index: 5;
}
.center-logo img {
    width: 35px;
}
.stat-card {
    background: rgba(255,255,255,.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 40px 20px;
    text-align: center;
    transition: .4s;
    border: 1px solid rgba(255,255,255,0.05);
}
.stat-card:hover { transform: translateY(-8px); background: rgba(255,255,255,.15); }
.stat-card h3 { font-size: 38px; color: var(--gold); margin-bottom: 5px; }
.stat-card p { color: white; font-size: 15px; }
`;
css = css.replace(/@media\(max-width:992px\)\s*{\s*\.about-container/, newAboutStatsCSS + '\n@media(max-width:992px){ \n.about-container');

css = css.replace(/@media\(max-width:480px\)\s*{\s*\.about-left\s*h2\s*{\s*font-size:\s*40px;\s*}\s*\.about-right\s*{\s*grid-template-columns:\s*1fr;\s*}\s*}/, `
@media(max-width:480px){
    .about-left h2{font-size:40px;}
    .stats-grid { gap: 10px; }
    .stat-card { padding: 25px 10px; }
    .stat-card h3 { font-size: 26px; }
    .stat-card p { font-size: 13px; }
    .center-logo { width: 45px; height: 45px; }
    .center-logo img { width: 25px; }
}
`);

fs.writeFileSync('c:/Users/shahn/OneDrive/Desktop/dhirajfood.com/style.css', css);
console.log('style.css updated successfully');
