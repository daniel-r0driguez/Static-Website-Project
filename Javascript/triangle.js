// a,b,c represent the triangle's sides
// A,B,C represent the triangle's angles
// Lines 37 - 83 are responsible for error catching. Lines 232 - 240 notify of error if a triangle is not possible.
const triangleAnswers = document.getElementById("triangleAnswers");
const possible1 = document.getElementById("possible1");
const possible2 = document.getElementById("possible2");
const errorMessage = document.getElementById("errorMessage");

const inputAngle_A = document.getElementById("angleA");
const inputAngle_B = document.getElementById("angleB");
const inputAngle_C = document.getElementById("angleC");

const inputSide_a = document.getElementById("side_a");
const inputSide_b = document.getElementById("side_b");
const inputSide_c = document.getElementById("side_c");

const solutionA = document.getElementById("solutionA");
const solutionB = document.getElementById("solutionB");
const solutionC = document.getElementById("solutionC");

const sideAnswer_a = document.getElementById("sideAnswer_a");
const sideAnswer_b = document.getElementById("sideAnswer_b");
const sideAnswer_c = document.getElementById("sideAnswer_c");

// If another triangle is possible.
const triangleAnswers2 = document.getElementById("triangleAnswers2");

const solutionA2 = document.getElementById("solutionA2");
const solutionB2 = document.getElementById("solutionB2");
const solutionC2 = document.getElementById("solutionC2");

const sideAnswer_a2 = document.getElementById("sideAnswer_a2");
const sideAnswer_b2 = document.getElementById("sideAnswer_b2");
const sideAnswer_c2 = document.getElementById("sideAnswer_c2");

function calculateTriangle ()
{
    errorMessage.innerHTML = "";
    possible1.style.display = "none";
    possible2.style.display = "none";
    triangleAnswers2.style.display = "none";
    // Get the side lengths of the triangle.
    const sideLengths = [];
    const angles = [];
    // Let the program know how many angles or sides were given.
    let numberOfSides = 0;
    let numberOfAngles = 0;
    let totalInputs = 0;
    let loopBreaker = 0;


    // For the sideLengths array, index 0 represents side a, index 1 represents side b, and index 2 represents side c.
    // Same goes for the angles array. 0 is angle A, 1 is angle B, and 2 is Angle C.
    sideLengths[0] = parseFloat(document.getElementById("side_a").value);
    sideLengths[1] = parseFloat(document.getElementById("side_b").value);
    sideLengths[2] = parseFloat(document.getElementById("side_c").value);
    // Get the angles of the triangle.
    angles [0] = convertToRadians(parseFloat(document.getElementById("angleA").value));
    angles [1] = convertToRadians(parseFloat(document.getElementById("angleB").value));
    angles [2] = convertToRadians(parseFloat(document.getElementById("angleC").value));



    // Count the number of sides given and check if all the sides are positive lengths.
    for (let i = 0; i < 3; i++)
    {
        if (Number.isNaN(sideLengths[i]) == false)
        {
            if (Math.sign(sideLengths[i]) == -1)
            {
                error (triangleAnswers);
                errorMessage.innerHTML = "Error. Values cannot be negative.";
                return 0;
            }
            numberOfSides++;
        }
    }
    // Count the number of angles given and check if all the angles are positive lengths and less than 180 degrees.
    for (let i = 0; i < 3; i++)
    {
        if (Number.isNaN(angles[i]) == false)
        {
            if (angles[i] >= Math.PI)
            {
                error (triangleAnswers);
                errorMessage.innerHTML = "Error. Given angle(s) greater than or equal to 180 degrees.";
                return 0;
            }
            if (Math.sign(angles[i]) == -1)
            {
                error (triangleAnswers);
                errorMessage.innerHTML = "Error. Values cannot be negative.";
                return 0;
            }
            numberOfAngles++;
        }
    }
    totalInputs = numberOfAngles + numberOfSides

    //The main area where errors will be caught such as having less than or greater than 3 total inputs, and checking if at least one side is given.
    if (totalInputs < 3)
    {
        error (triangleAnswers);
        errorMessage.innerHTML = "Please enter 3 positive values.";
        return 0;
    }
    else if (totalInputs > 3)
    {
        error (triangleAnswers);
        errorMessage.innerHTML = "Please enter only 3 positive values. You have entered " + totalInputs + ".";
        return 0;
    }
    else if (numberOfSides < 1)
    {
        error (triangleAnswers);
        errorMessage.innerHTML = "Please enter the value of one side.";
        return 0;
    }
    //If two angles are given, make sure their sum is not greater than 180 degrees.
    else if (angles[0] + angles[1] >= Math.PI || angles[0] + angles[2] >= Math.PI || angles[1] + angles[2] >= Math.PI)
    {
        error (triangleAnswers);
        errorMessage.innerHTML = "Error. Sum of given angles is greater than or equal to 180 degrees.";
        return 0;
    }
    // This while loop is resonsible for finding the missing sides and angles. For example, in the first loop, angles[0] is missing and cannot be found yet. But as the program finds more missing values, it is then able to use those values to eventually find angles[0] in later loops.
    while(loopBreaker < 5)
    {
        // Using the Law of Cosines to find the missing angles if three sides are given.
        if (numberOfSides == 3)
        {
            if (Number.isNaN(angles[0]))
            {
                angles[0] = findA_Cosine(sideLengths[0], sideLengths[1], sideLengths[2]);
            }
            if (Number.isNaN(angles[1]))
            {
                angles[1] = findB_Cosine(sideLengths[0], sideLengths[1], sideLengths[2]);
            }
            if (Number.isNaN(angles[2]))
            {
                angles[2] = findC_Cosine(sideLengths[0], sideLengths[1], sideLengths[2]);
            }
        }
        // The program takes this path if only two sides and one angle were given.
        if (numberOfSides == 2)
        {
            // Finding Side a through Law of Cosines
            if (Number.isNaN(sideLengths[0]) == true && Number.isNaN(sideLengths[1]) == false && Number.isNaN(sideLengths[2]) == false && Number.isNaN(angles[0]) == false)
            {
                sideLengths[0] = find_a_Cosine(sideLengths[1], sideLengths[2], angles[0]);
                numberOfSides += 1;
            }
            // Finding Angle A through Law of Sines
            else if (numberOfSides != 3 && Number.isNaN(angles[0]) == true && Number.isNaN(sideLengths[0]) == false && Number.isNaN(sideLengths[1]) == false && Number.isNaN(angles[1]) == false)
            {
                angles[0] = angleLawOfSines(sideLengths[0], sideLengths[1], angles[1]);
                if ((Math.PI - angles[0]) + angles[1] < Math.PI)
                {
                    otherPossibleTriangle(sideLengths[0], sideLengths[1], false, (Math.PI - angles[0]), angles[1], false);
                }
                angles[2] = Math.PI - (angles[0] + angles[1]);
                numberOfAngles += 2;
            }
            else if (numberOfSides != 3 && Number.isNaN(angles[0]) == true && Number.isNaN(sideLengths[0]) == false && Number.isNaN(sideLengths[2]) == false && Number.isNaN(angles[2]) == false)
            {
                angles[0] = angleLawOfSines(sideLengths[0], sideLengths[2], angles[2]);
                if ((Math.PI - angles[0]) + angles[2] < Math.PI)
                {
                    otherPossibleTriangle(sideLengths[0], false, sideLengths[2], (Math.PI - angles[0]), false, angles[2]);
                }
                angles[1] = Math.PI - (angles[0] + angles[2]);
                numberOfAngles += 2;
            }
            //Finding Side b through Law of Cosines
            if (Number.isNaN(sideLengths[1]) == true && Number.isNaN(sideLengths[0]) == false && Number.isNaN(sideLengths[2]) == false && Number.isNaN(angles[1]) == false)
            {
                sideLengths[1] = find_b_Cosine(sideLengths[0], sideLengths[2], angles[1]);
                numberOfSides += 1;
            }
            //Finding Angle B through Law of Sines
            else if (numberOfSides != 3 && Number.isNaN(angles[1]) == true && Number.isNaN(sideLengths[1]) == false && Number.isNaN(sideLengths[0]) == false && Number.isNaN(angles[0]) == false)
            {
                angles[1] = angleLawOfSines(sideLengths[1], sideLengths[0], angles[0]);
                if ((Math.PI - angles[1]) + angles[0] < Math.PI)
                {
                    otherPossibleTriangle(sideLengths[0], sideLengths[1], false, angles[0], (Math.PI - angles[1]), false);
                }
                angles[2] = Math.PI - (angles[0] + angles[1]);
                numberOfAngles += 2;
            }
            else if (numberOfSides != 3 && Number.isNaN(angles[1]) == true && Number.isNaN(sideLengths[1]) == false && Number.isNaN(sideLengths[2]) == false && Number.isNaN(angles[2]) == false)
            {
                angles[1] = angleLawOfSines(sideLengths[1], sideLengths[2], angles[2]);
                if ((Math.PI - angles[1]) + angles[2] < Math.PI)
                {
                    otherPossibleTriangle(false, sideLengths[1], sideLengths[2], false, (Math.PI - angles[1]), angles[2]);
                }
                angles[0] = Math.PI - (angles[1] + angles[2]);
                numberOfAngles += 2;
            }
            // Finding Side c through Law of Cosines
            if (Number.isNaN(sideLengths[2]) == true && Number.isNaN(sideLengths[0]) == false && Number.isNaN(sideLengths[1]) == false && Number.isNaN(angles[2]) == false)
            {
                sideLengths[2] = find_c_Cosine(sideLengths[0], sideLengths[1], angles[2]);
                numberOfSides += 1;
            }
            // Finding Angle C through Law of Sines
            else if (numberOfSides != 3 && Number.isNaN(angles[2]) == true && Number.isNaN(sideLengths[2]) == false && Number.isNaN(sideLengths[0]) == false && Number.isNaN(angles[0]) == false)
            {
                angles[2] = angleLawOfSines(sideLengths[2], sideLengths[0], angles[0]);
                if ((Math.PI - angles[2]) + angles[0] < Math.PI)
                {
                    otherPossibleTriangle(sideLengths[0], false, sideLengths[2], angles[0], false, (Math.PI - angles[2]));
                }
                angles[1] = Math.PI - (angles[0] + angles[2]);
                numberOfAngles += 2;
            }
            else if (numberOfSides != 3 && Number.isNaN(angles[2]) == true && Number.isNaN(sideLengths[2]) == false && Number.isNaN(sideLengths[1]) == false && Number.isNaN(angles[1]) == false)
            {
                angles[2] = angleLawOfSines(sideLengths[2], sideLengths[1], angles[1]);
                if ((Math.PI - angles[2]) + angles[0] < Math.PI)
                {
                    otherPossibleTriangle(false, sideLengths[1], sideLengths[2], false, angles[1], (Math.PI - angles[2]));
                }
                angles[0] = Math.PI - (angles[1] + angles[2]);
                numberOfAngles += 2;
            }
        }
        // The program takes this path if the number of sides given was one and two angles were given.
        else if (numberOfSides == 1)
        {
            if (Number.isNaN(angles[0]) == true && Number.isNaN(angles[1]) == false && Number.isNaN(angles[2]) == false)
            {
                angles[0] = Math.PI - (angles[1] + angles[2]);
                numberOfAngles += 1;
            }
            else if (Number.isNaN(angles[1]) == true && Number.isNaN(angles[0]) == false && Number.isNaN(angles[2]) == false)
            {
                angles[1] = Math.PI - (angles[0] + angles[2]);
                numberOfAngles += 1;
            }
            if (Number.isNaN(angles[2]) == true && Number.isNaN(angles[0]) == false && Number.isNaN(angles[1]) == false)
            {
                angles[2] = Math.PI - (angles[0] + angles[1]);
                numberOfAngles += 1;
            }
            // Finding Side a through Law of Sines
            if (Number.isNaN(sideLengths[0]) == true && Number.isNaN(sideLengths[1]) == false && Number.isNaN(angles[1]) == false && Number.isNaN(angles[0]) == false)
            {
                sideLengths[0] = sideLawOfSines(sideLengths[1], angles[0], angles[1]);
                numberOfSides += 1;
            }
            else if (Number.isNaN(sideLengths[0]) == true && Number.isNaN(sideLengths[2]) == false && Number.isNaN(angles[2]) == false && Number.isNaN(angles[0]) == false)
            {
                sideLengths[0] = sideLawOfSines(sideLengths[2], angles[0], angles[2]);
                numberOfSides += 1;
            }
            // Finding Side b through Law of Sines
            if (Number.isNaN(sideLengths[1]) == true && Number.isNaN(sideLengths[0]) == false && Number.isNaN(angles[0]) == false && Number.isNaN(angles[1]) == false)
            {
                sideLengths[1] = sideLawOfSines(sideLengths[0], angles[1], angles[0]);
                numberOfSides += 1;
            }
            else if (Number.isNaN(sideLengths[1]) == true && Number.isNaN(sideLengths[2]) == false && Number.isNaN(angles[2]) == false && Number.isNaN(angles[1]) == false)
            {
                sideLengths[1] = sideLawOfSines(sideLengths[2], angles[1], angles[2]);
                numberOfSides += 1;
            }
            // Finding Side c through Law of Sines
            if (Number.isNaN(sideLengths[2]) == true && Number.isNaN(sideLengths[0]) == false && Number.isNaN(angles[0]) == false && Number.isNaN(angles[2]) == false)
            {
                sideLengths[2] =sideLawOfSines(sideLengths[0], angles[2], angles[0]);
                numberOfSides += 1;
            }
            else if (Number.isNaN(sideLengths[2]) == true && Number.isNaN(sideLengths[1]) == false && Number.isNaN(angles[1]) == false && Number.isNaN(angles[2]) == false)
            {
                sideLengths[2] =sideLawOfSines(sideLengths[1], angles[2], angles[1]);
                numberOfSides += 1;
            }
        }
    // Finding Remaining Side Lengths (Just in case they weren't found in previous steps.)
        if (Number.isNaN(sideLengths[0]))
        {
            sideLengths[0] = find_a_Cosine(sideLengths[1], sideLengths[2], angles[0]);
            numberOfSides += 1;
        }
        if (Number.isNaN(sideLengths[1]))
        {
            sideLengths[1] = find_b_Cosine(sideLengths[0], sideLengths[2], angles[1])
            numberOfSides += 1;
        }
        if (Number.isNaN(sideLengths[2]))
        {
            sideLengths[2] = find_c_Cosine(sideLengths[0], sideLengths[1], angles[2]);
            numberOfSides += 1
        }
    loopBreaker++
    }
    // This for loop checks if any of the values is NaN. If one of them is, then that means a triangle is not possible with the given results.
    for (let i = 0; i < 3; i++)
    {
        if (Number.isNaN(angles[i]) == true || Number.isNaN(angles[i]) == true)
        {
            error(triangleAnswers);
            errorMessage.innerHTML = "Triangle not possible with given values.";
            return 0;
        }
    }
    for (let j = 0; j < 3; j++)
    {
        angles[j] = parseFloat(convertToDegrees(angles[j]).toFixed(5));
        sideLengths[j] = parseFloat(sideLengths[j].toFixed(5));
    }
    triangleAnswers.style.display = "block";
    sideAnswer_a.innerHTML = "Side a = " + sideLengths[0] + ".";
    sideAnswer_b.innerHTML = "Side b = " + sideLengths[1] + ".";
    sideAnswer_c.innerHTML = "Side c = " + sideLengths[2] + ".";
    solutionA.innerHTML = "Angle A = " + angles[0] + " degrees.";
    solutionB.innerHTML = "Angle B = " + angles[1] + " degrees.";
    solutionC.innerHTML = "Angle C = " + angles[2] + " degrees.";
}

function otherPossibleTriangle (side_a, side_b, side_c, angleA, angleB, angleC)
{
    if (angleA == false)
    {
        angleA = Math.PI - (angleB + angleC);
    }
    else if (angleB == false)
    {
        angleB = Math.PI - (angleA + angleC);
    }
    else if (angleC == false)
    {
        angleC = Math.PI - (angleA + angleB);
    }
    // Finding Side a through Law of Cosines.
    if (side_a == false && Number.isNaN(side_b) == false && Number.isNaN(side_c) == false && Number.isNaN(angleA) == false)
    {
        side_a = find_a_Cosine(side_b, side_c, angleA);
    }
    // Finding Side a through Law of Sines.
    else if (side_a == false && Number.isNaN(side_b) == false && Number.isNaN(angleB) == false && Number.isNaN(angleA) == false)
    {
        side_a = sideLawOfSines(side_b, angleA, angleB);
    }
    else if (side_a == false && Number.isNaN(side_c) == false && Number.isNaN(angleC) == false && Number.isNaN(angleA) == false)
    {
        side_a = sideLawOfSines(side_c, angleA, angleC);
    }
    // Finding Side b through Law of Cosines.
    else if (side_b == false && Number.isNaN(side_a) == false && Number.isNaN(side_c) == false && Number.isNaN(angleB) == false)
    {
        side_b = find_b_Cosine(side_a, side_c, angleB);
    }
    // Finding Side b through Law of Sines
    else if (side_b == false && Number.isNaN(side_a) == false && Number.isNaN(angleA) == false && Number.isNaN(angleB) == false)
    {
        side_b = sideLawOfSines(side_a, angleB, angleA);
    }
    else if (side_b == false && Number.isNaN(side_c) == false && Number.isNaN(angleC) == false && Number.isNaN(angleB) == false)
    {
        side_b = sideLawOfSines(side_c, angleB, angleC);
    }
    // Finding Side c through Law of Cosines.
    else if (side_c == false && Number.isNaN(side_a) == false && Number.isNaN(side_b) == false && Number.isNaN(angleC) == false)
    {
        side_c = find_b_Cosine(side_a, side_b, angleC);
    }
    // Finding Side c through Law of Sines.
    else if (side_c == false && Number.isNaN(side_a) == false && Number.isNaN(angleA) == false && Number.isNaN(angleC) == false)
    {
        side_c = sideLawOfSines(side_a, angleC, angleA);
    }
    else if (side_c == false && Number.isNaN(side_b) == false && Number.isNaN(angleB) == false && Number.isNaN(angleC) == false)
    {
        side_c = sideLawOfSines(side_b, angleC, angleB);
    }
    angleA = parseFloat(convertToDegrees(angleA).toFixed(5));
    angleB = parseFloat(convertToDegrees(angleB).toFixed(5));
    angleC = parseFloat(convertToDegrees(angleC).toFixed(5));
    side_a = parseFloat(side_a.toFixed(5));
    side_b = parseFloat(side_b.toFixed(5));
    side_c = parseFloat(side_c.toFixed(5));
    possible1.style.display = "block";
    possible2.style.display = "block";
    triangleAnswers2.style.display = "block";
    sideAnswer_a2.innerHTML = "Side a = " + side_a + ".";
    sideAnswer_b2.innerHTML = "Side b = " + side_b + ".";
    sideAnswer_c2.innerHTML = "Side c = " + side_c + ".";
    solutionA2.innerHTML = "Angle A = " + angleA + " degrees.";
    solutionB2.innerHTML = "Angle B = " + angleB + " degrees.";
    solutionC2.innerHTML = "Angle C = " + angleC + " degrees.";
}

function clearInputs ()
{
    inputSide_a.value = "";
    inputSide_b.value = "";
    inputSide_c.value = "";
    inputAngle_A.value = "";
    inputAngle_B.value = "";
    inputAngle_C.value = "";
    errorMessage.innerHTML = "";
    triangleAnswers.style.display = "none";
    triangleAnswers2.style.display = "none";
}



// Finding Angles
function angleLawOfSines (side1, side2, angle2)
{
    let A = Math.asin((side1 * Math.sin(angle2)) / side2)
    return A
}
function findA_Cosine (a, b, c)
{
    let A = Math.acos((Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c))
    return A
}
function findB_Cosine (a, b, c)
{
    let B = Math.acos((Math.pow(a, 2) + Math.pow(c, 2) - Math.pow(b, 2)) / (2 * a * c))
    return B
}
function findC_Cosine (a, b, c)
{
    let C = Math.acos((Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b))
    return C
}

// Finding Sides
function sideLawOfSines (side1, angle2, angle1)
{
    let a = (side1 * Math.sin(angle2)) / Math.sin(angle1);
    return a;
}
function find_a_Cosine (b, c, A)
{
    let a = Math.sqrt((b * b) + (c * c) - (2 * b * c * Math.cos(A)));
    return a;
}
function find_b_Cosine (a, c, B)
{
    let b = Math.sqrt((a * a) + (c * c) - (2 * a * c * Math.cos(B)));
    return b;
}
function find_c_Cosine (a, b, C)
{
    let c = Math.sqrt((a * a) + (b * b) - (2 * a * b * Math.cos(C)));
    return c;
}


//Simple Repetitive Functions
function convertToDegrees (radian_angle)
{
    let degree_angle = radian_angle * (180 / Math.PI);
    return degree_angle;
}
function convertToRadians (degree_angle)
{
    let radian_angle = degree_angle * (Math.PI / 180);
    return radian_angle;
}
function error (htmlElement)
{
    htmlElement.style.display = "none";
}