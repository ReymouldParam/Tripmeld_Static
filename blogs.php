<?php
// Database connection (Modify with your DB credentials)
$conn = new mysqli("localhost", "root", "", "your_database");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the blog ID from the URL
$blogId = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Fetch the blog from the database
$sql = "SELECT * FROM blogs WHERE id = $blogId";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $blog = $result->fetch_assoc();
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?php echo htmlspecialchars($blog['title']); ?></title>
    </head>
    <body>
        <h1><?php echo htmlspecialchars($blog['title']); ?></h1>
        <p><?php echo nl2br(htmlspecialchars($blog['content'])); ?></p>
    </body>
    </html>
    <?php
} else {
    echo "Blog post not found.";
}

$conn->close();
?>
