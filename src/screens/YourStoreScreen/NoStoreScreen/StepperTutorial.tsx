import React, {useState} from "react";
import {StepOne} from "./StepComponents/StepOne";
import {StepTwo} from "./StepComponents/StepTwo";
import {View} from "react-native";
import {Button} from "react-native-paper";
import {StepThree} from "./StepComponents/StepThree";
import {StepFour} from "./StepComponents/StepFour";

export const StepperTutorial = () => {

    const steps = [StepOne, StepTwo, StepThree, StepFour];
    const [currentStep, setCurrentStep] = useState(0);

    const onNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const onPrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const CurrentStepComponent = steps[currentStep];

    return(
        <>
            <View>
                <CurrentStepComponent />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: 20,
                        paddingTop: `17%`
                    }}
                >
                    <Button
                        mode="contained"
                        onPress={onPrevious}
                        disabled={currentStep === 0}
                    >
                        Wstecz
                    </Button>
                    <Button
                        mode="contained"
                        onPress={onNext}
                        disabled={currentStep === steps.length - 1}
                    >
                        Dalej
                    </Button>
                </View>
            </View>
        </>
    )
}