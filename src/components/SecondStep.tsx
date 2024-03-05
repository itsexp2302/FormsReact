// Step2.tsx
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import classes from './SecondStep.module.css';

interface FamilyMemberForm {
  firstName: string | null;
  lastName: string | null;
  isOpen: boolean; 
}

interface Step2Props {
  onPrevious: () => void;
  onComplete: (data: { familyMembers: FamilyMemberForm[] }) => void;
  goToComplete: (path: string) => void;
}

const SecondStep: React.FC<Step2Props> = ({ onPrevious, onComplete, goToComplete }) => {
  // const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<{ familyMembers: FamilyMemberForm[] }>({
    defaultValues: {
      familyMembers: [{ firstName: '', lastName: '', isOpen: false }],
    },
  });
  
  const [familyMembers, setFamilyMembers] = useState<FamilyMemberForm[]>([
    { firstName: '', lastName: '', isOpen: false },
  ]);

  const onSubmit: SubmitHandler<{ familyMembers: FamilyMemberForm[] }> = (data) => {
    onComplete(data);
    goToComplete('/complete');
  };

  const addFamilyMember = () => {
    setFamilyMembers([...familyMembers, { firstName: '', lastName: '', isOpen: false }]);
  };

  const toggleFamilyMemberForm = (index: number) => {
    const updatedFamilyMembers = [...familyMembers];
    updatedFamilyMembers[index].isOpen = !updatedFamilyMembers[index].isOpen;
    setFamilyMembers(updatedFamilyMembers);
  };

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleCompleteClick = () => {
    // Perform any necessary actions with formData
    // ...

    // Show success message
    setShowSuccessMessage(true);

    // Call the onComplete callback after some delay (for demonstration)
    setTimeout(() => {
      setShowSuccessMessage(false);
      
    }, 2000); // Adjust the delay as needed
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.container}>
        <h2>Step 2</h2>
        {familyMembers.map((member, index) => (
          <div key={index} className={classes.familymemberform}>
            <div
              className={classes.familymemberheader}
              onClick={() => toggleFamilyMemberForm(index)}
            >
              {`Family Member ${index + 1}`}
              {member.isOpen ? ' - Collapse' : ' - Expand'}
            </div>
            {member.isOpen && (
              <div className={classes.familymemberbody}>
                <label>
                  First Name:
                  <input
                    type="text"
                    {...register(`familyMembers.${index}.firstName`, { required: 'This field is required' })}
                  />
                  {errors?.familyMembers && Array.isArray(errors.familyMembers) && errors.familyMembers[index]?.firstName && (
  <p className={classes.errormessage}>{errors.familyMembers[index]?.firstName.message}</p>
)}

                </label>
                <label>
                  Last Name:
                  <input
                    type="text"
                    {...register(`familyMembers.${index}.lastName`, { required: 'This field is required' })}
                  />
                  {errors?.familyMembers && Array.isArray(errors.familyMembers) && errors.familyMembers[index]?.firstName && (
  <p className={classes.errormessage}>{errors.familyMembers[index]?.lastName.message}</p>
)}

                </label>
              </div>
            )}
          </div>
        ))}
        <button type="button" onClick={addFamilyMember}>
          Add More Family Member
        </button>
        <div>
          <button type="button" onClick={onPrevious}>
            Previous
          </button>
          <button type="submit" onClick={handleCompleteClick}>Complete</button>
          {showSuccessMessage && <p>Form completed successfully!</p>}
        </div>
      </div>
    </form>
  );
};

export default SecondStep;
