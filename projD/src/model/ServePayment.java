package model;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

public class ServePayment
{
	public ServePayment()
	{
		super();

	}

	public String computePayment(String p, String a, String r)
	{
		String result = "";
		double pay = 0;
		try
		{
			pay = computePayment(p, a, r, null);
		}
		catch(Exception e)
		{
			result = e.getMessage();
		}

		if(result.isEmpty())
		{
			result = String.valueOf(pay);
		}

		return result;
	}

	public String statusReport(String payment)
	{
		String result = "";
		if(isNumeric(payment))
		{
			result = "OK\n" + payment;
		}
		else
		{
			result = "NO\n" + payment;
		}
		return result;
	}

	private static boolean isNumeric(String str)  
	{  
		try  
		{  
			double d = Double.parseDouble(str);  
		}  
		catch(NumberFormatException nfe)  
		{  
			return false;  
		}  
		return true;  
	}
	
	private double computePayment(String p, String a, String r, String bank) throws Exception
	{

		double result = 0; //monthly payment
		double principle = validatePrinciple(p);
		int amortization = validateAmortization(a);
		double interest = validateInterest(r);;
		
		/*if(!r.isEmpty())
		{
			interest = validateInterest(r);
			
		}//if interest not empty
		else 
		{
			if((bank == null) || bank.isEmpty() || bank.equalsIgnoreCase(NO_BANK))
			{
				throw new Exception("You may need to choose a bank or enter an interest value!");
			}
			else
			{	//bank is specified
				MortgageBean mb = this.dao.getRate(principle, amortization, bank);
				interest = mb.getRate();
			}
			
		}*/
		result = computePayment(principle, amortization, interest);
		return result;
	}
	
	
//---------------------------------------------------------------------	
	private double computePayment(double principle, double amortization, double interest)
	{
		double result;
		interest = interest/100/12;
		double expo = Math.pow((1+ interest), (-amortization * 12));
		double payment = interest * principle/(1  - expo);
		double roundP = Math.round(payment * 100);
		result = roundP / 100;
		return result;
	}

	private double validatePrinciple(String principle) throws Exception
	{
		double result;
		try
		{
			result = Double.parseDouble(principle);
		}
		catch(Exception e)
		{
			throw new Exception("Principle is not numeric!");
		}
		if(result <= 0)
		{
			throw new Exception("Principle is not positive!");
		}
		return result;
	}
	private int validateAmortization(String amortization)throws Exception
	{
		int result;
			try
			{
				result = Integer.parseInt(amortization);
			}
			catch(Exception e)
			{
				throw new Exception("Amortization is not numeric!");
			}

			if((result != 20) && (result != 25) && (result != 30))
			{
				throw new Exception("Amortization is wrong!");
			}
			return result;
	}
	
	private double validateInterest(String interest)throws Exception
	{
		double result;
		try
		{
			result = Double.parseDouble(interest);
		}
		catch(Exception e)
		{
			throw new Exception("Interest is not numeric!");
		}
		if(result < 0)
		{
			throw new Exception("Interest is not positive!");
		}
		if(result > 100)
		{
			throw new Exception("Interest is out of range!");
		}
		return result;
	}



}
