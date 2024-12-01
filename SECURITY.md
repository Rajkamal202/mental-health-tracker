# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of Mental Health Tracker seriously. If you have discovered a security vulnerability in our project, please follow these steps to report it:

1. **Do not** disclose the vulnerability publicly until it has been addressed by our team.
2. Email us at rajkamalds2022@gmail.com with a detailed description of the vulnerability.
3. Include steps to reproduce the vulnerability, if possible.
4. We will acknowledge receipt of your vulnerability report within 48 hours.
5. We will send you regular updates about our progress.

## Security Measures

Mental Health Tracker implements the following security measures:

1. **Authentication**: We use JSON Web Tokens (JWT) for secure user authentication.
2. **Password Security**: User passwords are hashed using bcrypt before storage.
3. **HTTPS**: All communications between clients and our servers are encrypted using HTTPS.
4. **Input Validation**: We implement strict input validation on both client and server sides to prevent injection attacks.
5. **Rate Limiting**: API requests are rate-limited to prevent abuse and DDoS attacks.
6. **Secure Headers**: We use secure HTTP headers to prevent common web vulnerabilities.

## Data Protection

1. **Encryption**: All sensitive data is encrypted at rest and in transit.
2. **Data Minimization**: We only collect and retain the minimum amount of user data necessary for the application to function.
3. **Regular Backups**: User data is regularly backed up and stored securely.
4. **Access Control**: Strict access controls are in place to ensure that only authorized personnel can access user data.

## Third-party Dependencies

We regularly monitor and update our third-party dependencies to ensure they are free from known vulnerabilities. We use tools like npm audit to check for security issues in our dependencies.

## Security Update Process

1. Security updates are released as soon as possible after a vulnerability is confirmed.
2. Users will be notified of critical security updates via email and in-app notifications.
3. We follow responsible disclosure practices and will publish details of security issues after they have been resolved.

## Compliance

Mental Health Tracker is designed with privacy and security in mind. While we strive to adhere to best practices, we are not currently certified for any specific compliance standards (e.g., HIPAA). Users should be aware of this when using the application for sensitive health information.

## Security Best Practices for Users

1. Use a strong, unique password for your Mental Health Tracker account.
2. Enable two-factor authentication if available.
3. Be cautious about sharing your mental health data with third-party applications.
4. Regularly review your account activity for any suspicious actions.
5. Log out of your account when using shared or public devices.

## Contact

If you have any questions regarding this security policy, please contact us at rajkamalds2022@gmail.com.

