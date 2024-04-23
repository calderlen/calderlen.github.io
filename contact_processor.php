<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if the CAPTCHA is correct
    if (trim($_POST["captcha"]) == "4") {
        $name = strip_tags(trim($_POST["name"]));
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = strip_tags(trim($_POST["message"]));

        // Set the recipient email address
        $recipient = "calderlen@gmail.com";

        // Set the email subject
        $subject = "New contact from $name";

        // Build the email content
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Message:\n$message\n";

        // Build the email headers
        $email_headers = "From: $name <$email>";

        // Send the email
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Email sent successfully
            echo "Thank you for your message. It has been sent.";
        } else {
            // Email failed to send
            echo "Oops! Something went wrong, and we couldn't send your message.";
        }
    } else {
        // CAPTCHA was incorrect
        echo "The anti-spam answer was incorrect.";
    }
}
?>