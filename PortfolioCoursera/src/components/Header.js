import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto:hello@example.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const Header = () => {
  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(
        currentScrollPos < 200 || prevScrollPos > currentScrollPos
      );
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const getTransformValue = () => {
    return visible ? "translateY(0)" : "translateY(-100%)";
  };

  return (
    <Box
      ref={headerRef}
      position="fixed"
      top={0}
      left={0}
      right={0}
      transform={getTransformValue()}
      transition="transform 0.3s ease-in-out"
      backgroundColor="#18181b"
      zIndex={1000}
    >
      <HStack
        px={8}
        py={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack spacing={8}>
          {socials.map((social, index) => (
            <a href={social.url} key={index}>
              <FontAwesomeIcon
                icon={social.icon}
                size="2x"
                style={{ color: "white" }}
              />
            </a>
          ))}
        </HStack>
        <HStack spacing={8}>
          <a
            href="#projects-section"
            onClick={handleClick("projects")}
            style={{ fontSize: "20px", color: "white" }}
          >
            Projects
          </a>
          <a
            href="#contactme-section"
            onClick={handleClick("contactme")}
            style={{ fontSize: "20px", color: "white" }}
          >
            Contact Me
          </a>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Header;
