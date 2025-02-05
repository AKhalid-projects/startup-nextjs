import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CSTRSimulation: React.FC = () => {
  const [setpoint, setSetpoint] = useState(0.5); // Setpoint for second tank concentration
  const [disturbance, setDisturbance] = useState(2); // Disturbance on concentration
  const [tankLevel, setTankLevel] = useState(1); // Initial concentration in tank 2
  const [controllerOutput, setControllerOutput] = useState(0);
  const [time, setTime] = useState(0);
  const [data, setData] = useState<any[]>([]); // Data for the chart

  const [controllerType, setControllerType] = useState("PID"); // Controller type (PID, PI, Feedforward)

  // PID Parameters
  const Kp = 2; // Proportional gain
  const Ki = 0.5; // Integral gain
  const Kd = 0.1; // Derivative gain

  // Time Constants (from model)
  const tau1 = 8.25; // time constant for first tank
  const tau2 = 8.25; // time constant for second tank
  const F = 0.033; // flow rate (m3/min)
  const V = 1.05; // Volume of both tanks (m3)

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = time + 1;
      setTime(newTime);

      // Simulate the system dynamics (using simple differential equations)
      let error = setpoint - tankLevel;

      // Control output based on selected controller type
      let controlOutput = 0;
      if (controllerType === "PID") {
        // PID control: u(t) = Kp * e(t) + Ki * integral(e(t)) + Kd * derivative(e(t))
        controlOutput =
          Kp * error + Ki * (error * newTime) + Kd * (error - tankLevel);
      } else if (controllerType === "PI") {
        // PI control: u(t) = Kp * e(t) + Ki * integral(e(t))
        controlOutput = Kp * error + Ki * (error * newTime);
      } else if (controllerType === "Feedforward") {
        // Feedforward control
        controlOutput = F * (disturbance - tankLevel);
      }

      setControllerOutput(controlOutput);

      // Update tank levels (simplified model)
      const newTankLevel = tankLevel + controlOutput - disturbance;
      setTankLevel(newTankLevel);

      // Append new data point to the chart data
      setData((prevData) => [
        ...prevData,
        {
          time: newTime,
          tankLevel: newTankLevel,
          controllerOutput: controlOutput,
        },
      ]);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [time, tankLevel, disturbance, setpoint, controllerType]);

  return (
    <div>
      <h1>CSTR Control System Simulation</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="tankLevel" stroke="#8884d8" />
          <Line type="monotone" dataKey="controllerOutput" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CSTRSimulation;
