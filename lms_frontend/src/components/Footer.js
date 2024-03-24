function Footer() {
    return (
      <footer className="bg-dark text-light py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5>About TechEduca</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in sagittis felis. Nulla facilisi. Donec aliquam, quam eu consectetur sollicitudin.</p>
            </div>
            <div className="col-md-3">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="/courses" className="text-light">Courses</a></li>
                <li><a href="/teachers" className="text-light">Teachers</a></li>
                <li><a href="/about" className="text-light">About Us</a></li>
                <li><a href="/contact" className="text-light">Contact Us</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Contact Info</h5>
              <p>123 Tech Street, TechCity</p>
              <p>Email: info@techeduca.com</p>
              <p>Phone: +1 (123) 456-7890</p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="text-center">
            <p>&copy; {new Date().getFullYear()} TechEduca. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }

  export default Footer;