import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Button,
  Typography,
  Space,
  Switch,
  message,
  Row,
  Col,
} from "antd";
import { SunOutlined, MoonOutlined, RocketOutlined } from "@ant-design/icons";
import { FaCode } from "react-icons/fa";
import useCreateProject from "../hooks/apis/mutations/useCreateProject";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export const CreateProject = () => {
  const [isDark, setIsDark] = useState(true);
  const { createProjectMutation } = useCreateProject();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  async function handleCreateProject() {
    if (isCreating) {
      return;
    }
    setIsCreating(true);

    setTimeout(async () => {
      try {
        const response = await createProjectMutation();
        message.success("Project created successfully");
        navigate(`/project/${response.data}`);
      } catch (error) {
        console.error("Error creating project", error);
        message.error("Error creating project");
      } finally {
        setIsCreating(false);
      }
    }, 2000);
  }

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const layoutStyle = {
    minHeight: "100vh",
    backgroundColor: isDark ? "#0a0a0a" : "#ffffff",
    color: isDark ? "#ffffff" : "#000000",
  };

  const headerStyle = {
    backgroundColor: isDark ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(12px)",
    borderBottom: isDark ? "1px solid #262626" : "1px solid #f0f0f0",
    padding: "0 24px",
    height: "64px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const contentStyle = {
    padding: "80px 24px",
    backgroundColor: isDark ? "#0a0a0a" : "#ffffff",
  };

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space align="center" size="middle">
              <FaCode
                style={{
                  fontSize: "24px",
                  color: isDark ? "#1890ff" : "#1890ff",
                }}
              />
              <Title
                level={4}
                style={{
                  margin: 0,
                  color: isDark ? "#ffffff" : "#000000",
                  fontWeight: 600,
                }}
              >
                CodeSandbox
              </Title>
            </Space>
          </Col>

          <Col>
            <Space align="center" size="middle">
              <SunOutlined style={{ color: isDark ? "#8c8c8c" : "#faad14" }} />
              <Switch checked={isDark} onChange={toggleTheme} size="small" />
              <MoonOutlined style={{ color: isDark ? "#1890ff" : "#8c8c8c" }} />
            </Space>
          </Col>
        </Row>
      </Header>

      <Content style={contentStyle}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Hero Section */}
          <div style={{ textAlign: "center", marginBottom: "100px" }}>
            <Title
              level={1}
              style={{
                color: isDark ? "#ffffff" : "#000000",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 700,
                marginBottom: "24px",
                lineHeight: 1.2,
              }}
            >
              Build React Apps
              <br />
              <span style={{ color: "#1890ff" }}>Instantly</span>
            </Title>

            <Text
              style={{
                color: isDark ? "#8c8c8c" : "#595959",
                fontSize: "1.25rem",
                lineHeight: 1.6,
                display: "block",
                maxWidth: "600px",
                margin: "0 auto 48px auto",
              }}
            >
              The fastest way to create, edit, and deploy React applications.
              Start coding in seconds with zero configuration.
            </Text>

            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              loading={isCreating}
              onClick={handleCreateProject}
              style={{
                height: "56px",
                padding: "0 32px",
                fontSize: "18px",
                fontWeight: 600,
                borderRadius: "8px",
              }}
            >
              {isCreating ? "Creating Your Project..." : "Create New Project"}
            </Button>
          </div>
        </div>
      </Content>
    </Layout>
  );
};
