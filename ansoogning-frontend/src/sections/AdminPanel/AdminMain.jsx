import { Container,Text } from "@hope-ui/solid"
import AdminCategory from "./AdminCategory";

function AdminMain() {
  return (
    <div>
      <Container>
        <br />
        <Text size="4xl"> Admin Panel</Text>
        <Text size="base">An admin panel to controll the categories, questions and answers</Text>
      <AdminCategory/>
        <br />
      </Container>
    </div>
  );
}

export default AdminMain;
