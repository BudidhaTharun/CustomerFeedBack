
import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Popover,
  Divider,
  Box,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Star, StarBorder } from "@mui/icons-material";

const feedbackCategories = [
  { label: "Product Features", value: "Product Features" },
  { label: "Product Pricing", value: "Product Pricing" },
  { label: "Product Usability", value: "Product Usability" },
];

const productCategories = [
  { label: "Groceries", value: "Groceries" },
  { label: "Baby Products", value: "Baby Products" },
  { label: "Electronics", value: "Electronics" },
  { label: "Home & Kitchen", value: "Home & Kitchen" },
];

const Home = () => {
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState({
    productName: "",
    productCategory: "",
    category: "",
    rating: 0,
    comment: "",
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(jwtDecode(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleStarClick = (index) => {
    setFeedback({ ...feedback, rating: index + 1 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("User not logged in!");
      return;
    }

    try {
      const response = await fetch("mongodb+srv://tharunbudidha:1234567890@customerfeedback.p2urszj.mongodb.net/?retryWrites=true&w=majority&appName=customerfeedback/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...feedback, googleId: user.sub, name: user.name, email: user.email }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to submit feedback");

      alert("Feedback submitted successfully!");
      setFeedback({ productName: "", productCategory: "", category: "", rating: 0, comment: "" });
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleViewFeedbacks = () => {
    handlePopoverClose();
    navigate("/user_feedbacks", { state: { user } });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, backgroundColor: "#fafafa", p: 3, borderRadius: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          {user ? `Welcome, ${user.name}` : "Welcome"}
        </Typography>
        {user && (
          <IconButton onClick={handleAvatarClick}>
            <Avatar src={user.picture} alt={user.name} />
          </IconButton>
        )}
      </Box>
      <Popover
  open={Boolean(anchorEl)}
  anchorEl={anchorEl}
  onClose={handlePopoverClose}
  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
  transformOrigin={{ vertical: "top", horizontal: "right" }}
>
  <Card sx={{ p: 3, minWidth: 300, borderRadius: 3, backgroundColor: "#ffffff", boxShadow: 6 }}>
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Avatar sx={{ width: 50, height: 50, backgroundColor: "#3f51b5", mr: 2 }}>
        {user?.name?.[0].toUpperCase()}
      </Avatar>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
          {user?.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {user?.email}
        </Typography>
      </Box>
    </Box>

    <Divider sx={{ my: 1 }} />

    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Button
        onClick={handleViewFeedbacks}
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          borderRadius: 3,
          textTransform: "none",
          padding: "8px 16px",
          fontSize: "14px",
        }}
      >
        View Feedbacks
      </Button>

      <Button
        onClick={handleLogout}
        variant="outlined"
        color="error"
        fullWidth
        sx={{
          borderRadius: 3,
          textTransform: "none",
          padding: "8px 16px",
          fontSize: "14px",
          borderColor: "error.main",
        }}
      >
        Logout
      </Button>
    </Box>
  </Card>
</Popover>

      <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3, backgroundColor: "#ffffff", mt: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" mb={3} color="primary" align="center">
            Submit Your Feedback
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Product Name"
                  name="productName"
                  value={feedback.productName}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  color="primary"
                  required
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Product Category"
                  name="productCategory"
                  value={feedback.productCategory}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  color="primary"
                  required
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="" disabled>Select</MenuItem> {/* Default 'Select' option */}
                  {productCategories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Feedback Category"
                  name="category"
                  value={feedback.category}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  color="primary"
                  required
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="" disabled>Select</MenuItem> {/* Default 'Select' option */}
                  {feedbackCategories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1" mr={1}>
                    Rating:
                  </Typography>
                  {[...Array(5)].map((_, index) => (
                    <IconButton key={index} onClick={() => handleStarClick(index)}>
                      {index < feedback.rating ? (
                        <Star sx={{ color: "#FFD700", fontSize: "30px" }} />
                      ) : (
                        <StarBorder sx={{ fontSize: "30px" }} />
                      )}
                    </IconButton>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Your Feedback"
                  name="comment"
                  value={feedback.comment}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  color="primary"
                  required
                  multiline
                  rows={4}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    p: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    borderRadius: 2,
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#1976d2",
                      boxShadow: "0px 4px 15px rgba(25, 118, 210, 0.2)",
                    },
                  }}
                >
                  Submit Feedback
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home;



