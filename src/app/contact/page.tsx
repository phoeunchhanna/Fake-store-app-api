export default function ContactPage() {
    return (
        <div className="contact-page">
            <h1>Contact Us</h1>
            <p>
                Have questions or feedback? We’d love to hear from you. Fill out the form below or reach out directly.
            </p>

            <form
                className="contact-form"
                action="https://formspree.io/f/xrbyjdrn"
                method="POST"
            >
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Your Name" required />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="you@example.com" required />
                </div>

                <div className="form-group">
                    <label>Message</label>
                    <textarea name="message" placeholder="Your message..." required></textarea>
                </div>

                <button type="submit">Send Message</button>
            </form>
        </div>
    );
}
