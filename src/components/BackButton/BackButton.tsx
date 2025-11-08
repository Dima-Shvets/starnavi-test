import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function BackButton() {
  const navigate = useNavigate();

  const onBacButtonClick = () => {
    navigate(-1);
  };
  return (
    <Button variant="ghost" onClick={onBacButtonClick}>
      <ArrowLeft /> Back
    </Button>
  );
}
