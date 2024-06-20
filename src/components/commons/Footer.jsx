

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4">
            <div className="container text-center">
                <div className="row">
                    <div className="col-md-6">
                        <h5>About Us</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla malesuada tortor tellus, vel dictum lectus aliquet id.</p>
                    </div>
                    <div className="col-md-3">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a className="text-decoration-none text-white" href="/">Home</a></li>
                            <li><a className="text-decoration-none text-white" href="/aboutUs">About Us</a></li>
                            <li><a className="text-decoration-none text-white" href="/contactUs">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Contact</h5>
                        <address>
                            <p>123 Street Name</p>
                            <p>City, Country</p>
                            <p>Phone: +123456789</p>
                            <p>Email: info@example.com</p>
                        </address>
                    </div>
                </div>
            </div>
            <div className="text-center py-2" style={{ backgroundColor: '#343a40' }}>
                <p className="text-white">&copy; 2024 Your Company. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer