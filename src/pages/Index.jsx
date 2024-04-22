import React, { useState } from "react";
import { Box, Button, ChakraProvider, Flex, FormControl, FormLabel, Heading, Input, Stack, Textarea, useToast, VStack } from "@chakra-ui/react";
import { FaEnvelope, FaLock, FaPaperPlane, FaPenFancy, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [emails, setEmails] = useState([]);
  const [emailContent, setEmailContent] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const toast = useToast();

  const handleLogin = () => {
    // Dummy authentication
    if (user.username === "admin" && user.password === "admin") {
      setIsLoggedIn(true);
      toast({
        title: "Logged in",
        description: "You have successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRegister = () => {
    // Dummy registration
    toast({
      title: "Registration Successful",
      description: "You can now log in with your credentials.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSendEmail = () => {
    setEmails([...emails, { subject: emailSubject, content: emailContent }]);
    setEmailSubject("");
    setEmailContent("");
    setIsComposing(false);
    toast({
      title: "Email Sent",
      description: "Your email has been sent successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleCompose = () => {
    setIsComposing(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ username: "", password: "" });
  };

  return (
    <ChakraProvider>
      <Flex direction="column" align="center" justify="center" h="100vh">
        {!isLoggedIn ? (
          <VStack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input icon={<FaUserPlus />} placeholder="Username" onChange={(e) => setUser({ ...user, username: e.target.value })} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" icon={<FaLock />} placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
            </FormControl>
            <Button leftIcon={<FaSignInAlt />} colorScheme="blue" onClick={handleLogin}>
              Login
            </Button>
            <Button leftIcon={<FaUserPlus />} colorScheme="green" onClick={handleRegister}>
              Register
            </Button>
          </VStack>
        ) : (
          <VStack spacing={4} w="100%">
            <Button leftIcon={<FaPenFancy />} colorScheme="teal" onClick={handleCompose}>
              Compose Email
            </Button>
            <Button leftIcon={<FaEnvelope />} colorScheme="orange" onClick={() => setIsComposing(false)}>
              Inbox
            </Button>
            <Button leftIcon={<FaSignInAlt />} colorScheme="red" onClick={handleLogout}>
              Logout
            </Button>
            {isComposing ? (
              <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
                <FormControl id="emailSubject">
                  <FormLabel>Subject</FormLabel>
                  <Input value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} />
                </FormControl>
                <FormControl id="emailContent">
                  <FormLabel>Content</FormLabel>
                  <Textarea value={emailContent} onChange={(e) => setEmailContent(e.target.value)} />
                </FormControl>
                <Button leftIcon={<FaPaperPlane />} colorScheme="blue" mt={4} onClick={handleSendEmail}>
                  Send
                </Button>
              </Box>
            ) : (
              <VStack spacing={4} w="100%">
                {emails.map((email, index) => (
                  <Box key={index} p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
                    <Heading fontSize="xl">{email.subject}</Heading>
                    <p>{email.content}</p>
                  </Box>
                ))}
              </VStack>
            )}
          </VStack>
        )}
      </Flex>
    </ChakraProvider>
  );
};

export default Index;
