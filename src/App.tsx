// App.tsx
import React, { useState } from 'react';
import FirstStep from './components/FirstStep';
import SecondStep from './components/SecondStep';


const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{ firstName?: string; lastName?: string }>({});

  const handleNext = (data: { firstName: string }) => {
    setFormData({ ...formData, ...data });
    setStep(2);
  };

  const handlePrevious = () => {
    setStep(1);
  };

  // const handleComplete = (data: { lastName: string }) => {
  //   setFormData({ ...formData, ...data });
  //   console.log('Form Data:', formData);
  // };

  interface FamilyMemberForm {
    firstName: string | null;
    lastName: string | null;
    isOpen: boolean; 
  }

  const handleComplete = (data: { familyMembers: FamilyMemberForm[] }) => {
    // Process the array of family members
    setFormData({ ...formData, ...data });
    data.familyMembers.forEach((familyMember) => {
      console.log(familyMember.firstName, familyMember.lastName);
      // Perform any other logic
    });
  };

  const goToComplete = (path: string) => {
    // Handle navigation to complete page
    console.log(`Navigating to ${path}`);
  };

  return (
    <div>
      {step === 1 && <FirstStep onNext={handleNext} />}
      {step === 2 && <SecondStep onPrevious={handlePrevious} onComplete={handleComplete} goToComplete={goToComplete}/>}
    </div>
  );
};

export default App;
